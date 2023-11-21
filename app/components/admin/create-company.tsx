import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HttpService } from "../../__services";
import { openSnackbar, storageService } from "../../__services";
import { v4 as uuidv4 } from "uuid";
import { REGEX } from "../../__constants";
import { ValidationInterface } from "../../interfaces";

export const CreateCompany = () => {
  const [is_error, setError] = useState<boolean>(true);
  const [image, setImage] = useState<any>();

  const router = useRouter();

  const [formValues, setFormValues] = useState<
    Record<any, ValidationInterface>
  >({
    name: {
      value: "",
      error: false,
      errorMessage: "Ce champ est requi",
      validator: REGEX.TEXT,
    },
    email: {
      value: "",
      error: false,
      errorMessage: "Email Invalid",
      validator: REGEX.EMAIL,
    },
    phone_number: {
      value: "",
      error: false,
      errorMessage: "Numeros Invalid",
      validator: REGEX.PHONE_NUMBER,
    },
    address: {
      value: "",
      error: false,
      errorMessage: "Ce champ est requi",
      validator: REGEX.TEXT,
    },
    sector: {
      value: "",
      error: false,
      errorMessage: "Ce champ est requi",
      required: true,
    },
    description: {
      value: "",
      error: false,
      errorMessage: "Briefly Description is required",
      required: true,
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let formData = new FormData();

    const fileTypes = ["png", "jpeg", "jpg", "webp"];
    const file = e.target.files;
    const fileType = file?.item(0)?.type.split("/")[1];

    if (fileType?.length && fileTypes.includes(fileType)) {
      formData.append("file", file![0]);
      HttpService.httpService("upload-file", "POST", formData).then((res) => {
        setImage({
          name: file![0]?.name,
          img_url: res?.data?.url_file,
        });
        openSnackbar({
          message: "image téléchargée avec succès",
          type: "success",
        });
      });
      return;
    }
    openSnackbar({
      message: "type d'image invalide",
      type: "warning",
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    let { name, value }: Record<any, string> = e.target;
    let targetProperty = formValues[name];

    let error = targetProperty?.validator
      ? !targetProperty.validator.test(value)
      : false;

    targetProperty.required && !value.trim().length && (error = true);

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error,
      },
    });
  };

  useEffect(() => {
    let x = Object.entries(formValues).find(
      ([key, value]) => value.error || !value.value.length
    );
    if (x === undefined && image !== undefined) {
      setError(false);
    } else {
      setError(true);
    }
  }, [formValues, image]);

  const onSubmit = () => {
    const company_uuid = uuidv4();
    let values = {
      name: formValues.name.value,
      email: formValues.email.value,
      description: formValues.description.value,
      logo: image?.img_url,
      sectorOfActivity: formValues.sector.value,
      address: formValues.address.value,
      uuid: company_uuid,
      phoneNumber: formValues.phone_number.value,
      urlRedirection: `${
        process.env.APP_URL
      }company/${storageService.hashString(company_uuid)}`,
    };
    HttpService.httpService("company", "POST", values).then((res) => {
      if (!res?.response?.data?.error) {
        // router.push(`/company/${storageService.hashString(company_uuid)}`);
        openSnackbar({
            message: "Entreprise créée avec succès. L'email a été envoyé à l'entreprise",
            type: "success",
          });
        router.push(`/admin`).then(console.log);
      } else {
        openSnackbar({
          message:
            res?.response?.data?.message ??
            "An Error occured! Please Try Again later.",
          type: "error",
        });
      }
    });
  };

  return (
    <main>
      <hr />
      <div className="difContainer">
        <div className="difBloc">
          <div className="difHeadings">
            <h2>Enregistrer un Entreprise</h2>
          </div>
          <form action="" id="difRegister" method="post">
            <div className="difFlex">
              <fieldset>
                <label htmlFor="difName">
                  <span>Nom de l&#39;entreprise:</span>
                  <input
                    type="text"
                    id="difName"
                    value={formValues.name.value}
                    onChange={handleChange}
                    className="difName"
                    name="name"
                    placeholder="Entre le nom de l&#39;entreprise"
                    required
                  />
                  <small className="error">
                    {formValues.name.error && formValues.name.errorMessage}
                  </small>
                </label>
                <label htmlFor="difEmail">
                  <span>E-mail:</span>
                  <input
                    type="text"
                    id="difEmail"
                    className="difEmail"
                    value={formValues.email.value}
                    onChange={handleChange}
                    name="email"
                    placeholder="Entre l'adress mail"
                    required
                  />
                  <small className="error">
                    {formValues.email.error && formValues.email.errorMessage}
                  </small>
                </label>
                <label htmlFor="difAddress">
                  <span>Address</span>
                  <input
                    type="text"
                    id="difAddress"
                    className="difAddress"
                    value={formValues.address.value}
                    onChange={handleChange}
                    name="address"
                    placeholder="Entre l'adress de l'entreprise"
                    required
                  />
                  <small className="error">
                    {formValues.address.error &&
                      formValues.address.errorMessage}
                  </small>
                </label>
                <label htmlFor="difSecteur">
                  <span>Secteur d&#39;activité:</span>
                  <select
                    id="difSecteur"
                    className="difSecteur"
                    value={formValues.sector.value}
                    onChange={handleChange}
                    name="sector"
                  >
                    <option value="">---</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Banque/Finance">Banque/Finance</option>
                  </select>
                  <small className="error">
                    {formValues.sector.error && formValues.sector.errorMessage}
                  </small>
                </label>
              </fieldset>
              <fieldset>
                <label htmlFor="difAddress">
                  <span>Phone</span>
                  <input
                    type="text"
                    id="difAddress"
                    className="difAddress"
                    value={formValues.phone_number.value}
                    onChange={handleChange}
                    name="phone_number"
                    placeholder="Numeros de telephone"
                    required
                  />
                  <small className="error">
                    {formValues.phone_number.error &&
                      formValues.phone_number.errorMessage}
                  </small>
                </label>

                <label htmlFor="difDescription">
                  <span>Description:</span>
                  <textarea
                    id="difDescription"
                    value={formValues.description.value}
                    onChange={handleChange}
                    className="difDescription"
                    name="description"
                    required
                  ></textarea>
                  <small className="error">
                    {formValues.description.error &&
                      formValues.description.errorMessage}
                  </small>
                </label>
                <label className="difBtn" id="difScannerOpen">
                  <span>
                    <i className="fa-solid fa-camera"></i>
                    Logo de l&#39;entreprise
                  </span>
                  <input
                    type="file"
                    id="difLogo"
                    className="difLogo"
                    name="logo"
                    accept="image/*;capture=camera"
                    onChange={handleImage}
                  />
                  <small>{image && image?.name}</small>
                </label>
              </fieldset>
            </div>
          </form>
          <button
            disabled={is_error}
            onClick={onSubmit}
            className="difBtn difBtnGreen"
            style={
              is_error
                ? { cursor: "not-allowed", background: "#bbb" }
                : { cursor: "pointer" }
            }
          >
            Continuer
          </button>
        </div>
      </div>
    </main>
  );
};
