import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HttpService } from "../../__services/http.service";
import { Pagination } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialogModal from "../global/Modal";
import { NextPage } from "next";
import { openSnackbar, storageService } from "../../__services";

export const Companies: NextPage = () => {
  const [page, setPage] = React.useState<number>(0);
  const [show, onShow] = React.useState(false);

  const [companyId, setCompanyId] = React.useState<number | any | undefined>(
    null
  );
  const [currentState, setCurrentState] = useState<any[]>([]);

  const [metaData, setMetadata] = React.useState<any>(null);

  const router = useRouter();

  const handleDeleteCompany = () => {
    onShow(false);
    HttpService.httpService(`company/${companyId}`, "DELETE").then((res) => {
      openSnackbar({
        message: `Company ${companyId} deleted successfully`,
        type: "success",
      });
      const x = currentState.filter(y => y.id !== companyId)
      setCurrentState(x);
    });
  };

  useEffect(() => {
    HttpService.httpService("company?page=1&limit=10", "GET").then((res) => {
      setCurrentState(res?.data?.items ?? []);
      setMetadata(res?.data?.meta);
    });
  }, []);

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

  const handleEditCompany = (uuid: string) => {
    router.push(`/admin/company/${storageService.hashString(uuid)}`);
  };

  return (
    <>
      <AlertDialogModal
        is_open={show}
        on_hide={() => onShow(false)}
        message={"This Action is Not Revisible!"}
        type={"ERROR"}
        action={handleDeleteCompany}
      />

      <main>
        <hr />
        <div className="difContainer difBloc">
          <div className="difHeadings difFlex">
            <h2>Liste des entreprises ({currentState?.length.toString()})</h2>
            <Link href="/admin/create-company">
              <a
                className="difBtn difBtnGreen"
                style={{ alignItems: "center", display: "flex" }}
              >
                <AddIcon /> Ajouter une entreprise
              </a>
            </Link>
          </div>

          {!currentState?.length ? (
            <span>Aucun Entreprise</span>
          ) : (
            <table id="difParticipants" className="difTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom de l&#39;entreprise</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Sectuer d&#39;activité</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentState.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.idCompany}</td>
                    <td>{data?.name}</td>
                    <td>{data?.description.slice(0, 50) + "..."}</td>
                    <td>{data?.address}</td>
                    <td>{data?.phoneNumber}</td>
                    <td>{data?.email}</td>
                    <td>{data?.sectorOfActivity}</td>

                    <td>
                      <button onClick={() => handleEditCompany(data?.uuid)}>
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => {
                          setCompanyId(data?.idCompany);
                          onShow(true);
                        }}
                        className="difRed"
                      >
                        <DeleteForeverIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <nav className="difPagination">
            <Pagination
              count={metaData?.totalPages}
              page={metaData?.currentPage ?? 1}
              onChange={handleChange}
            />
          </nav>
        </div>
      </main>
    </>
  );
};
