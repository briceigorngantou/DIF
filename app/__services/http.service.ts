import { HttpMethods } from "../__constants";
import axios, { AxiosError, AxiosInstance } from "axios";
import { storageService } from "./storage.service";
import { hideLoader, showLoader } from "./handleLoader.service";

class HTTPBaseService {
  protected instance: AxiosInstance;
  protected token: string = "";
  protected readonly baseURL: string = process.env.API_URL || "";

  public constructor() {
    this.instance = axios.create({
      baseURL: this.baseURL,
    });

    this.initializeResponseInterceptor();
  }

  async httpService(
    path: string,
    method: HttpMethods,
    payload?: any
  ): Promise<any> {
    showLoader();
    try {
      let response: any;

      let config: any = {
        headers: {
          Authorization: `Bearer ${storageService.decryptAny("DIF_TOKEN")}`,
        },
      };

      path === "upload-file" &&
        (config.headers["Content-Type"] = "multipart/form-data");

      switch (method) {
        case "POST":
          response = await axios.post(
            `${this.baseURL}${path}`,
            payload,
            config
          );
          break;
        case "PUT":
          response = await axios.put(`${this.baseURL}${path}`, payload, config);
          break;
        case "DELETE":
          response = await axios.delete(`${this.baseURL}${path}`, config);
          break;
        case "GET":
          response = await axios.get(`${this.baseURL}${path}`, config);
          break;
        default:
          break;
      }

      return response;
    } catch (error) {
      console.log(error, "from request ");
      return error;
    } finally {
      hideLoader();
    }
  }

  private initializeResponseInterceptor() {
    axios.interceptors.response.use((response) => {
      console.log(response, "interceptor");
      return response;
    }, this.handleError);
  }

  private async handleError(error: AxiosError) {
    const originalRequest = error.config as any;
    if (error.response?.status === 401) {
      return this.instance(originalRequest);
    }
    return error;
  }
}

export const HttpService = new HTTPBaseService();
