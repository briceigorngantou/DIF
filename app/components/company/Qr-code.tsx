import * as React from "react";
import { useState } from "react";
import { HttpService } from "../../__services";
import { CompanyInterface } from "../../interfaces";
import { useRouter } from "next/router";
import { openSnackbar, storageService } from "../../__services";

export const QRcode = () => {
  const [companyData, setCompanyData] = useState<CompanyInterface>();
  const router = useRouter();

  let uuid:any = '';

  React.useEffect(() => {
    let x = window.location.href.split("/company/")[1].split('/')[0].trim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    uuid = storageService.returnHashStringValue(x);

    if (uuid) {
      HttpService.httpService(`company/uuid/?uuid=${uuid}`, "GET").then(
        (res) => {
          if (res?.status && res.status >= 200 && res.status < 300) {
            setCompanyData(res?.data);
          }
        }
      );
    }else {
        openSnackbar({
            message: "Lien Invalid.",
            type: 'error',
        })
        router.back();
    }
  }, []);

  return (
    <>
        {
            companyData ? <main>
                <hr />
                <section id="difOtpVisitesWrapper">
                    <div className="difContainer difNumberScan" style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }} >
                        <h2>{companyData?.numberVisitor}</h2>
                        <p>Visites sur votre stand</p>

                        <button
                            onClick={() => {
                                router.push(
                                    `/company/${window.location.href.split("/company/")[1].split('/')[0].trim()}/scann`
                                );
                            }}
                            className="difBtn difBtnGreen"
                            id="difScannerOpen"
                        >
                            Scanner un QR Code
                        </button>
                    </div>
                </section>
            </main> : null
        }

    </>
  );
};
