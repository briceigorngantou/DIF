import * as React from "react";
import { useEffect, useState } from "react";
import { HttpService } from "../../__services";
import { useRouter } from "next/router";
import { openSnackbar, storageService } from "../../__services";
import { REGEX } from "../../__constants";
import { ValidationInterface } from "../../interfaces";

export const Login = () => {
  const [is_error, setError] = useState<boolean>(true);
  const router = useRouter();

  const [formValues, setFormValues] = useState<
    Record<any, ValidationInterface>
  >({
    email: {
      value: "",
      error: false,
      errorMessage: "Email Invalid",
      validator: REGEX.EMAIL,
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Che champ est requi",
      required: true,
    },
  });

  const handleChange = (e: any) => {
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
    if (x === undefined) {
      setError(false);
    } else {
      setError(true);
    }
  }, [formValues]);

  const onSubmit = () => {
    let values = {
      username: formValues.email.value,
      password: formValues.password.value,
    };
    HttpService.httpService("auth/login", "POST", values).then((res) => {
      if (res?.status < 400 && res?.status >= 200 && res?.data?.success) {
        storageService.encryptAny("DIF_TOKEN", res?.data?.access_token);
        router.push("/admin/");
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
    <>
      <hr />
      <div id="difLoginPage">
        <div id="difLoginWrapper"  className="difFlex" style={{ minHeight: 'calc(80vh - 110px)' }}>
          <section id="difLoginWrapperLeft">
            <div className="difHeadings">
              <h2>Se Connecter</h2>
            </div>
            <form>
              <label htmlFor="difEmail">
                <span>E-mail</span>
                <input
                  type="text"
                  id="difEmail"
                  value={formValues.email.value}
                  onChange={handleChange}
                  className="difEmail"
                  name="email"
                  placeholder="E-mail"
                  required
                />
                <small className="error">
                  {formValues.email.error && formValues.email.errorMessage}
                </small>
              </label>
              <label htmlFor="difPassword">
                <span>Password</span>
                <input
                  type="text"
                  id="difPassword"
                  value={formValues.password.value}
                  onChange={handleChange}
                  className="difPassword"
                  name="password"
                  placeholder="Mot de Passe"
                  required
                />
                <small className="error">
                  {formValues.password.error &&
                    formValues.password.errorMessage}
                </small>
              </label>
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
          </section>
        </div>
      </div>
    </>
  );
};
