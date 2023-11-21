import * as React from "react";
import { NextPage } from "next";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";
import Image from "next/image";
import Logo from "../../public/logo-digital-innovation-festival.svg";
import { useRouter } from "next/router";
import { HttpService, storageService } from "../../__services";
import { Loader } from "../global/Loader";

export const Ticket: NextPage = () => {
  const component = React.useRef(null);
  const [userData, setUserData] = React.useState<any>(null);

  const router = useRouter();

  let uuid = "";

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    uuid = storageService.returnHashStringValue(
      window.location.href.split("ticket/")[1]
    );

    if (uuid) {
      HttpService.httpService(`user/uuid/${parseInt(uuid)}`, "GET").then(
        (res) => {
          if (res?.status && res.status >= 200 && res.status < 300) {
            setUserData(res?.data);
          }
        }
      );
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => component.current,
  });

  return (
    <main>
      {/* <Loader is_loading={isLoading}/> */}
      <hr />
      <div className="difContainer difBloc">
        <div className="difHeadings">
          <h2>Merci de vous être enregistré</h2>
          <p>
            Un E-mail de confirmation vous a été envoyé avec votre ticket
            d&#39;entrée à l&#39;adresse <strong>{userData?.email}</strong>
          </p>
          <p>
            Veuillez présenter votre QR-code à l&#39;entrée de l&#39;événement.
          </p>
        </div>
        <section ref={component}>
          <div id="difTicket">
            <h2>Ticket</h2>
            <div className="difFlex">
              <div>
                <div>
                  <span className="difAttr">Nom:</span>
                  <span className="difData">
                    {userData?.firstName} {userData?.lastName}
                  </span>
                </div>
                <div>
                  <span className="difAttr">Contact:</span>
                  <span className="difData">{userData?.phoneNumber}</span>
                </div>
                <div>
                  <span className="difAttr">Email:</span>
                  <span className="difData">{userData?.email}</span>
                </div>
                <div>
                  <span className="difAttr">Date:</span>
                  <span className="difData">
                    {new Date(userData?.createAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <Image
                    src={Logo}
                    width={100}
                    height={100}
                    alt="Digital Innovation Festival"
                  />
                </div>
              </div>
              <div>
                <figure id="difQrcode">
                  <QRCode size={200} value={`${userData?.uuid}`} />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <div style={{ marginTop: 40 }}>
          <button onClick={handlePrint} style={{ textDecoration: "underline" }}>
            Imprimez ticket en pdf
          </button>
        </div>
      </div>
    </main>
  );
};
