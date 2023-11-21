import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { HttpService, openSnackbar } from "../__services";
import AlertDialogModal from "./global/Modal";
import { ContactType } from "../interfaces";
import { BehaviorSubject } from "rxjs";

export const Default = () => {
  const [currentState, setCurrentState] = React.useState<any[]>([]);
  const [metaData, setMetadata] = React.useState<any>(null);
  const [userContact, setUserContact] = React.useState<
    Partial<ContactType> | any
  >(null);
  const [show, setShow] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(1);

  const sectorOptions = [
    {
      label: "Agriculture",
      value: "Agriculture",
    },
    {
      label: "Informatique",
      value: "Informatique",
    },
    {
      label: "Banque/Finance",
      value: "Banque/Finance",
    },
  ];

  const locationOptions = [
    {
      label: "Douala",
      value: "Douala",
    },
    {
      label: "Yaoundé",
      value: "Yaoundé",
    },
    {
      label: "Limbé",
      value: "Limbé",
    },
  ];

  const [filterValues, setFilterValues] = React.useState<any>({
    address: locationOptions[1].value,
    sector: sectorOptions[1].value,
  });

  React.useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);

  const submitFilter = (e: any) => {
    e.preventDefault();
    HttpService.httpService(
      `company?page=1&limit=10&address=${filterValues.address}&sector=${filterValues.sector}`,
      "GET"
    ).then((res) => {
      setCurrentState(res?.data?.items ?? []);
      setMetadata(res?.data?.meta);
      if (res?.message) {
        openSnackbar({
          type: "error",
          message: res?.message,
        });
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    HttpService.httpService(`company?page=${value}&limit=10`, "GET").then(
      (res) => {
        setCurrentState(res?.data?.items ?? []);
        setMetadata(res?.data?.meta);
        setPage(value);
      }
    );
  };

  React.useEffect(() => {
    HttpService.httpService("company?page=1&limit=10", "GET").then((res) => {
      setCurrentState(res?.data?.items ?? []);
      setMetadata(res?.data?.meta);
      if (res?.message) {
        openSnackbar({
          type: "error",
          message: res?.message,
        });
      }
    });
  }, []);

  const sendContactDemand = (id: number, payload: ContactType) => {
    HttpService.httpService(`company/contact/${id}`, "GET").then(() => {
      setShow(true);
      setUserContact(payload);
    });
  };

  return (
    <main>
      <AlertDialogModal
        type="INFO"
        is_open={show}
        on_hide={() => setShow(false)}
        message={`
                    <strong>Email:</strong> <a style="text-decoration: underline">${userContact?.email}</a> <br/>
                    <strong>Address:</strong> <a style="text-decoration: underline">${userContact?.address}</a> <br/>
                    <strong>Phone Number:</strong> <a style="text-decoration: underline">${userContact?.phoneNumber}</a> <br/>
            `}
      />
      <hr />
      <div className="difContainer difBloc">
        <div className="difHeadings">
          <h2>Liste des entreprises ({currentState.length.toString()})</h2>
        </div>

        <div id="difFilter">
          <div className="difFlex">
            <label htmlFor="difSecteur">
              <span>Secteur:</span>

              <select
                id="difSecteur"
                value={filterValues.sector}
                onChange={(e) => {
                  setFilterValues({
                    sector: e.target.value,
                    address: filterValues.address,
                  });
                }}
                className="difSecteur"
                name="sector"
              >
                {sectorOptions.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="difLocalisation">
              <span>Localisation:</span>
              <select
                id="difLocalisation"
                className="difLocalisation"
                name="address"
                value={filterValues.address}
                onChange={(e) => {
                  setFilterValues({
                    sector: filterValues.sector,
                    address: e.target.value,
                  });
                }}
              >
                {locationOptions.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              onClick={submitFilter}
              className="difBtn difBtnGreen"
            >
              Filtrer
            </button>
          </div>
        </div>

        <section id="difEntreprisesList">
          <div className="difFlex">
            {!currentState.length ? (
              <span>No Companies Found</span>
            ) : (
              currentState.map((state, index) => (
                <div key={index} className="idItem">
                  <div
                    style={{
                      backgroundImage: `url("${state?.logo}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100% 300px",
                      width: "100%",
                      height: "300px",
                    }}
                  ></div>
                  <div
                    style={{
                      overflow: "hidden",
                      padding: "0px 1rem",
                      height: "calc(400px - 220px - 40px)",
                    }}
                  >
                    <h3>{state?.name}</h3>
                    <p>
                      {state?.description.slice(0, 200)}
                      {state?.description.length > 200 ? "..." : ""}
                    </p>
                  </div>
                  <button
                    className="difBtn enterpriseBtn difBtnGreen"
                    onClick={(e) =>
                      sendContactDemand(state?.idCompany, {
                        email: state?.email,
                        address: state?.address,
                        phoneNumber: state?.phoneNumber,
                      })
                    }
                  >
                    Demander le contact
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <nav className="difPagination">
          <Pagination
            count={metaData?.totalPages}
            page={metaData?.currentPage ?? 1}
            onChange={handleChange}
          />
        </nav>
      </div>
    </main>
  );
};
