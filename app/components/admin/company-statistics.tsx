import * as React from "react";
import { useEffect, useState } from "react";
import { HttpService } from "../../__services/http.service";
import { Pagination } from "@mui/material";

const CompanyStatistics = () => {
  const [page, setPage] = React.useState(0);
  const [currentState, setCurrentState] = useState<any[]>([]);

  const [metaData, setMetadata] = React.useState<any>(null);

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

  return (
    <>
      <main>
        <hr />
        <div className="difContainer difBloc">
          <div className="difHeadings difFlex">
            <h2>Statistics Des Visiteurs ({currentState?.length.toString()})</h2>
          </div>

          {!currentState?.length ? (
            <span>Auccun Entreprise</span>
          ) : (
            <table id="difParticipants" className="difTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom de l&#39;entreprise</th>
                  <th>Visiteur</th>
                </tr>
              </thead>
              <tbody>
                {currentState.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.idCompany}</td>
                    <td>{data?.name}</td>
                    <td>{data?.numberVisitor}</td>
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
export default CompanyStatistics;
