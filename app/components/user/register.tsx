import React, { MouseEventHandler, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { openSnackbar, storageService } from "../../__services";
import { HttpService } from "../../__services";
import { REGEX } from "../../__constants";
import { ValidationInterface } from "../../interfaces";

export const RegisterEvent: NextPage = () => {
  const [is_error, setError] = useState<boolean>(true);
  const router = useRouter();

  const [formValues, setFormValues] = useState<
    Record<any, ValidationInterface>
  >({
    first_name: {
      value: "",
      error: false,
      errorMessage: "This Field is Required",
      required: true,
    },
    last_name: {
      value: "",
      error: false,
      errorMessage: "This Field is Required",
      required: true,
    },
    email: {
      value: "",
      error: false,
      errorMessage: "Invalid Email Address",
      validator: REGEX.EMAIL,
    },
    phone_number: {
      value: "",
      error: false,
      errorMessage: "Invalid Phone Number",
      validator: REGEX.PHONE_NUMBER,
    },
    sector: {
      value: "",
      error: false,
      errorMessage: "This Field is Required",
      required: true,
    },
  });

  useEffect(() => {
    let x = Object.entries(formValues).find(
      ([key, value]) => value.error || !value.value.length
    );
    if (x === undefined) {
      setError(false);
    } else {
      setError(true);
    }
  }, [formValues]);

  const handleChange = (e: any) => {
    let { name, value }: Record<any, string> = e.target;

    let targetProperty = formValues[name];

    let error = targetProperty?.validator
      ? !targetProperty.validator.test(value)
      : false;
    if (targetProperty.required && !value.trim().length) error = true;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error,
      },
    });
  };

  const onSubmit = (e: any) => {
    // e.stopPropagation()
    e.preventDefault();

    const uuid = Math.floor(Math.random() * 1000000);
    const user_uuid = storageService.hashString(uuid);

    let values = {
      firstName: formValues.first_name.value,
      lastName: formValues.last_name.value,
      email: formValues.email.value,
      phoneNumber: formValues.phone_number.value,
      sectorOfActivity: formValues.sector.value,
      uuid,
      urlRedirection: `${process.env.APP_URL}user/ticket/${user_uuid}`,
    };

    HttpService.httpService("qr-code/save-visitor", "POST", values).then(
      (res) => {
        if (res?.status < 400 && res?.status >= 200 && res?.data?.success) {
          storageService.encryptAny(
            "DIF_TOKEN",
            res?.response?.data?.access_token
          );
          openSnackbar({
            type: "success",
            message: res?.response?.data?.message || "Enregistrement réussi",
          });
          storageService.encryptAny("DIF_USER_ID", uuid.toString());
          router.push("/user/ticket/" + user_uuid);
        } else {
          openSnackbar({
            type: "error",
            message: res?.response?.data?.message,
          });
        }
      }
    );
  };

  return (
    <main>
      <hr />
      <div className="difContainer">
        <div className="difBloc">
          <div className="difHeadings">
            <h2>S&#39;enregistrer</h2>
          </div>
          <form id="difRegister">
            <div className="difFlex">
              <fieldset>
                <label htmlFor="difName">
                  <span>Nom</span>
                  <input
                    type="text"
                    id="difName"
                    value={formValues.first_name.value}
                    onChange={handleChange}
                    className="difName"
                    name="first_name"
                    placeholder="Nom"
                    required
                  />
                  <small className="error">
                    {formValues.first_name.error &&
                      formValues.first_name.errorMessage}
                  </small>
                </label>
                <label htmlFor="difName">
                  <span>Prénom</span>
                  <input
                    type="text"
                    id="difName"
                    value={formValues.last_name.value}
                    onChange={handleChange}
                    className="difName"
                    name="last_name"
                    placeholder="prenom"
                    required
                  />
                  <small className="error">
                    {formValues.last_name.error &&
                      formValues.last_name.errorMessage}
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
                    <option value="">--</option>
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
                <label htmlFor="difEmail">
                  <span>E-mail:</span>
                  <input
                    type="text"
                    id="difEmail"
                    className="difEmail"
                    value={formValues.email.value}
                    onChange={handleChange}
                    name="email"
                    placeholder="E-mail"
                    required
                  />
                  <small className="error">
                    {formValues.email.error && formValues.email.errorMessage}
                  </small>
                </label>
                <label htmlFor="difAddress">
                  <span>Téléphone</span>
                  <input
                    type="text"
                    id="difAddress"
                    className="difAddress"
                    value={formValues.phone_number.value}
                    onChange={handleChange}
                    name="phone_number"
                    placeholder="phone"
                    required
                  />
                  <small className="error">
                    {formValues.phone_number.error &&
                      formValues.phone_number.errorMessage}
                  </small>
                </label>
              </fieldset>
            </div>

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
          </form>
        </div>
      </div>
    </main>
  );
};
