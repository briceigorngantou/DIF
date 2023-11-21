import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { HttpService, openSnackbar, storageService } from "../../__services";
import { CompanyInterface } from "../../interfaces";
import Image from "next/image";
import Logo from "./../../public/logo-digital-innovation-festival.svg";

export const LoginCompany = () => {
  const [state, setState] = useState({ code: "" });
  const handleState = (new_state: any) => setState({ code: new_state });

  const [companyData, setCompanyData] = useState<CompanyInterface>();

  const router = useRouter();

  let { uuid } = React.useRef(router.query) as any;

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    uuid = storageService.returnHashStringValue(
            window.location.href.split("/company/")[1])

    if (uuid) {
      HttpService.httpService(`company/uuid/?uuid=${uuid}`, "GET").then(
        (res) => {
          if (res?.status && res.status >= 200 && res.status < 300) {
            setCompanyData(res?.data);
          } else {
            //   openSnackbar({
            //       message: "Une Erruer",
            //       type: 'error',
            //   })
          }
        }
      );
    }
  }, []);

  const onSubmit = () => {
    HttpService.httpService(`company/verify`, "POST", {
      code: parseInt(state.code),
    }).then((res) => {
      if (res?.status && res.status >= 200 && res.status < 300) {
        router.push(window.location.href + "/qrcode")
      } else {
        openSnackbar({
          message: "Code Invalid.",
          type: "error",
        });
      }
    });
  };

  return (
    <>
        {
            companyData ? <div>
                <hr />
                <Paper
                    variant="outlined"
                    square
                    sx={{
                        px: 2,
                        py: 2,
                        maxWidth: "100%",
                        mx: "auto",
                        my: 2,
                        background: "transparent",
                        border: "none",
                    }}
                >
                    <Image
                        src={companyData?.logo ?? Logo}
                        width={100}
                        height={100}
                        priority
                    />

                    <Box sx={{ my: 1 }}>
                        <Typography variant="subtitle2" sx={{ mt: 2 }}>
                            Identifier votre entreprise afin de pouvoir scanner les QR Codes
                            visiteurs sur votre stand.
                        </Typography>
                        <Typography variant="h5">Code unique</Typography>
                    </Box>

                    <OtpInput
                        value={state.code}
                        onChange={handleState}
                        numInputs={4}
                        inputStyle={{
                            width: "4rem",
                            minWidth: "4rem",
                            height: "3rem",
                            margin: "0.7em 0.5rem",
                            fontSize: "2rem",
                            borderRadius: 10,
                            border: "1px solid rgba(0,0,0,0.3)",
                        }}
                    />

                    <button
                        disabled={state?.code?.length < 4}
                        onClick={onSubmit}
                        className="difBtn difBtnGreen"
                        style={
                            state?.code?.length < 4
                                ? {
                                    cursor: "not-allowed",
                                    background: "#bbb",
                                }
                                : { cursor: "pointer" }
                        }
                    >
                        Continuer
                    </button>
                </Paper>
            </div>: null
        }

    </>
  );
};
