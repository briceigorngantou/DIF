import { useRouter } from "next/router";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { CompanyInterface } from "../../../interfaces";
import { HttpService, openSnackbar, storageService } from "../../../__services";

export default function ScanCode() {
  const [companyData, setCompanyData] = useState<CompanyInterface>();
  const [data, setData] = useState<any>(null);

  const router = useRouter();
  let { uuid } = router.query;
  uuid =
    typeof uuid === "string" && !!uuid
      ? storageService.returnHashStringValue(uuid)
      : "";

  React.useEffect(() => {
    HttpService.httpService(`company/uuid/?uuid=${uuid}`, "GET").then((res) => {
      if (res?.status && res.status >= 200 && res.status < 300) {
        setCompanyData(res?.data);
        storageService.encryptAny('DIF_COMP_INFO', res.data);
      }
    });
  }, []);


  const scannCode = () => {
    const x = storageService.decryptAny('DIF_COMP_INFO', true)
    const y = storageService.decryptAny('DIF_SCAN_TOKEN')

    HttpService.httpService(`scanned`, "POST", {
        idCompany: x?.idCompany,
        uuid: y,
      }).then((res) => {
      if (res?.status && res.status >= 200 && res.status < 300) {
        openSnackbar({
          message: `Scanned successfully`,
          type: "success",
        });
        setTimeout(() => {
          router.push(
            `/company/${
              typeof uuid === "string" ? storageService.hashString(uuid) : uuid
            }/qrcode`
          );
        }, 2000);
      }
    });
  };

  return (
    <QrReader
      onResult={(result:any) => {
        if (!!result) {
            storageService.encryptAny('DIF_SCAN_TOKEN', result.text);
            scannCode();
        }
      }}
      scanDelay={0}
      constraints={{ facingMode: "environment" }}
    />
  );
}
