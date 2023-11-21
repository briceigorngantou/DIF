import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { FirebaseService } from "./firebase/firebase.service";

@Injectable()
export class UploadFileService {
  private response: HttpException;
  constructor(private readonly fbs: FirebaseService) {}

  /**
   *
   * @param {Express.Multer.File} payload
   * @returns {Promise<HttpException>} Promise
   */
  async uploadSingleFile(payload: Express.Multer.File): Promise<HttpException> {
    try {
      const mimetype = payload.originalname.split(/\.(jpg|jpeg|png|webp)$/);
      const fileType = mimetype.length == 1 ? "documents" : "images";
      const file = await this.fbs.createFiles({
        file: payload.originalname,
        file_type: fileType,
        folder_name: "upload",
        buffer: payload.buffer,
      });
      this.response = new HttpException("uploaded with Success", HttpStatus.OK);
      this.response["name"] = "Single File Upload";
      this.response["message"] = "OK";
      this.response["url_file"] = file;

      return this.response;
    } catch (error) {
      return new InternalServerErrorException(JSON.stringify(error));
    }
  }
}
