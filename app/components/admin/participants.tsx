import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HttpService } from "../../__services";
import { Pagination } from "@mui/material";
import { CSVLink } from "react-csv";

export const Participants = () => {
  const [page, setPage] = React.useState<number>(0);
  const [currentState, setCurrentState] = useState<any[]>([]);

  const [metaData, setMetadata] = React.useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    HttpService.httpService("user?page=1&limit=10", "GET").then((res) => {
      if (res?.data) {
        setCurrentState(res?.data?.items ?? []);
        setMetadata(res?.data?.meta);
      } else {
        router.push("/admin/login");
      }
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    HttpService.httpService(`user?page=${value}&limit=10`, "GET").then(
      (res) => {
        setCurrentState(res?.data?.items ?? []);
        setMetadata(res?.data?.meta);
        setPage(value);
      }
    );
  };

  return (
    <main>
      <hr />
      <div className="difContainer difBloc">
        <div className="difHeadings difFlex">
          <h2>Liste des Participants ({metaData?.totalItems})</h2>
        </div>

        {!currentState?.length ? (
          <span>No participants yet</span>
        ) : (
          <table id="difParticipants" className="difTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Sectuer d&#39;activité</th>
                <th>qrCode</th>
              </tr>
            </thead>
            <tbody>
              {currentState.map((data, index) => (
                <tr key={index}>
                  <td>{data?.idUser}</td>
                  <td>
                    {data?.firstName} {data?.lastName}
                  </td>
                  <td>{data?.phoneNumber}</td>
                  <td>{data?.email}</td>
                  <td>{data?.sectorOfActivity}</td>
                  <td>{data?.uuid ?? "1536410895232565"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <nav
          className="difPagination"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Pagination
            count={metaData?.totalPages}
            page={metaData?.currentPage ?? 1}
            onChange={handleChange}
          />

          <CSVLink
            data={currentState}
            style={{ textDecoration: "underline" }}
            title="participants"
          >
            Exporter les statistic
          </CSVLink>
        </nav>
      </div>
    </main>
  );
};
