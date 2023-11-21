import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as MailJet from "node-mailjet";
import * as dotenv from "dotenv";
import { CreateMailDto } from "./../dto/CreateMail.dto";

dotenv.config();

@Injectable()
export class MailJetService {
  mail = MailJet.connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  async sendMail(emailForm: CreateMailDto): Promise<any> {
    try {
      const template = `<main style="background-color: #38377a; margin: 90px">
      <section style="background-color: #f9f9f9; margin-bottom: 1rem">
        <div
          style="
            justify-content: space-between;
            align-items: center;
            position: relative;
            width: 100%;
          "
        >
          <section
            style="
              margin-left: 8%;
              flex-direction: column;
              padding: 4rem 0 0 0;
              margin-right: 8%;
              background-color: #f9f9f9;
              grid-template-columns: 1fr 1fr 1fr 1fr;
              grid-template-rows: 1fr;
              gap: 5%;
              width: 100%;
              display: block;
              margin: 0 auto 2rem auto;
              display: block;
              fill: #38377a;
              color: #38377a;
              text-align: center;
            "
          >
            <div
              style="
                width: 100%;
                justify-content: space-between;
                text-align: justify;
                margin-bottom: 1rem;
                padding-left: 5rem;
              "
            >
              <p></p>
              ${emailForm.message}<br />
            </div>
            <div style="border-top: 0.01rem solid #d6e3f2; width: 100%"></div>
            <footer
              style="
                width: 100%;
                justify-content: space-between;
                margin-bottom: 1rem;
                padding-left: 2.35rem;
              "
            >
              <div style="margin-top: 2rem">
                <div style="width: 90%; justify-content: space-between">
                  <div style="display: flex">
                    <div
                      style="
                        flex: 0 1 40%;
                        flex-direction: column;
                        margin: 25px;
                        gap: 10px;
                        width: 100%;
                        font-size: 1rem;
                      "
                    >
                      <div style="text-align: justify">
                        <div>
                          <a href="http://digitalinnovationfestival.tech/"
                            ><img
                              style="width: 60%; height: 100px"
                              src="https://firebasestorage.googleapis.com/v0/b/digitalinnovationfestival.appspot.com/o/logo-384.png?alt=media&token=f2b666af-13a1-40b2-9662-dc334c274ec4"
                              alt="logo"
                          /></a>
                        </div>
                        <div>
                          <p>
                            ActivSpaces est le premier incubateur technologique
                            du Cameroun dont l’objectif est de créer un
                            environnement adéquat pour la croissance des
                            startups et de favoriser le développement des
                            entrepreneurs.
                          </p>
                        </div>
                        <div>
                          <p style="font-weight: bold">(+237) 677 777 777</p>
                        </div>
                        <div>
                          <a href="mailto:info@digitalinnovationfestival.com">
                            info@digitalinnovationfestival.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      style="
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                      "
                    >
                      <div
                        style="
                          flex: 0 1 25%;
                          gap: 10%;
                          padding: 0.65rem 0;
                          flex-direction: column;
                          margin-bottom: 1rem;
                        "
                      >
                        <div>
                          <p
                            style="
                              font-size: 18px;
                              text-align: left;
                              margin-left: 35px;
                              font-weight: bold;
                              margin-bottom: 10px;
                            "
                          >
                            Liens Utiles
                          </p>
                        </div>
                        <div
                          style="
                            text-align: justify;
                            margin-bottom: 10px;
                            display: flex;
                          "
                        >
                          <ul style="list-style: none; width: 100%">
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <a
                                href="http://digitalinnovationfestival.tech/"
                                style="text-decoration: none"
                                >L’évènement</a
                              >
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <a
                                href="http://digitalinnovationfestival.tech/"
                                style="text-decoration: none"
                                >Gallerie</a
                              >
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <a
                                href="http://digitalinnovationfestival.tech/"
                                style="text-decoration: none"
                                >Les Intervenants</a
                              >
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <a
                                href="http://digitalinnovationfestival.tech/"
                                style="text-decoration: none"
                                >Le Programme</a
                              >
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <a
                                href="http://digitalinnovationfestival.tech/"
                                style="text-decoration: none"
                                >Les Partenaires</a
                              >
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <a
                                href="http://digitalinnovationfestival.tech/"
                                style="text-decoration: none"
                                >Les Packages</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        style="
                          flex: 0 1 25%;
                          gap: 10%;
                          padding: 0.65rem 0;
                          flex-direction: column;
                          margin-bottom: 1rem;
                        "
                      >
                        <div>
                          <p
                            style="
                              font-size: 18px;
                              text-align: left;
                              margin-left: 35px;
                              font-weight: bold;
                              margin-bottom: 10px;
                            "
                          >
                            Quelques activités
                          </p>
                        </div>
                        <div
                          style="
                            text-align: justify;
                            margin-bottom: 10px;
                            display: flex;
                          "
                        >
                          <ul style="list-style: none; width: 100%">
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <span>Conférence</span>
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <span>Hackathon</span>
                            </li>
                            <li
                              style="
                                width: 100%;
                                text-align: justify;
                                font-size: 16px;
                                padding: 0.5rem;
                              "
                            >
                              <span>Pitch Contest</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        style="margin-bottom: 1rem; flex: 0 1 65%; width: 100%"
                      >
                        <p
                          style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-bottom: 10px;
                          "
                        >
                          Contact Us
                        </p>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            background-color: rgb(254, 251, 251);
                            height: 16px;
                            line-height: 0;
                            border-radius: 50px;
                            border-radius: 50px;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0.5rem 0.5rem 0.5rem 2rem;
                            height: max-content;
                          "
                        >
                          <form
                            method="post"
                            style="display: flex"
                            action=""
                            enctype="multipart/form-data"
                            style="display: flex"
                          >
                            <input
                              type="email"
                              id="rewardsNewsletterEmail"
                              name="rewardsNewsletterEmail"
                              placeholder="Votre adresse e-mail"
                              style="
                                outline: 0;
                                border: none;
                                border-radius: 50px;
                                margin-bottom: 1rem;
                                margin-top: 0.5rem;
                                background-color: rgb(254, 251, 251);
                                padding: 1rem 2rem;
                                border-radius: 35px;
                                border: 3px solid #38377a;
                                width: 100%;
                              "
                              required
                            />
                            <button
                              type="submit"
                              style="
                                padding: 1rem 1rem;
                                margin: 0.5rem;
                                border-radius: 20px;
                                cursor: pointer;
                                width: 50px;
                                height: 50px;
                                background-color: #38377a;
                              "
                            >
                              <svg
                                style="
                                  width: 15px;
                                  height: 15px;
                                  justify-content: center;
                                  align-items: center;
                                "
                                viewBox="0 0 26 26"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="rgb(254, 251, 251)"
                              >
                                <path
                                  d="M2.06075 0.970925L24.6357 11.7677C24.8639 11.8767 25.0566 12.048 25.1915 12.2619C25.3264 12.4757 25.3979 12.7234 25.3979 12.9763C25.3979 13.2291 25.3264 13.4768 25.1915 13.6907C25.0566 13.9046 24.8639 14.0759 24.6357 14.1849L2.06075 24.9816C1.82932 25.0925 1.57092 25.1345 1.3163 25.1027C1.06167 25.0709 0.821535 24.9667 0.624463 24.8023C0.427391 24.638 0.281678 24.4205 0.204662 24.1757C0.127645 23.931 0.122568 23.6692 0.190033 23.4216L2.4486 15.1416C2.47625 15.0402 2.53316 14.9491 2.61223 14.8797C2.6913 14.8104 2.78903 14.7658 2.89325 14.7516L13.8325 13.2656C13.8783 13.2591 13.9215 13.2408 13.9581 13.2127C13.9947 13.1845 14.0234 13.1474 14.0415 13.1049L14.0607 13.0384C14.0692 12.9786 14.0572 12.9177 14.0266 12.8656C13.9961 12.8134 13.9488 12.7732 13.8925 12.7513L13.8336 12.7352L2.90503 11.2491C2.80101 11.2348 2.70351 11.1901 2.62464 11.1208C2.54578 11.0515 2.48904 10.9605 2.46146 10.8591L0.190033 2.532C0.122294 2.28435 0.127165 2.02245 0.204066 1.7775C0.280966 1.53254 0.426655 1.31485 0.623779 1.15035C0.820904 0.985857 1.06116 0.881488 1.31592 0.849677C1.57069 0.817865 1.82923 0.859952 2.06075 0.970925Z"
                                />
                              </svg>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </section>
          <div
            style="
              text-align: center;
              width: 100%;
              padding-top: 5px;
              padding-bottom: 5px;
              background-color: #444294;
            "
          >
            <div
              style="
                width: 100%;
                justify-content: space-between;
                position: relative;
                margin-bottom: 1rem;
                margin: auto;
                color: rgb(254, 251, 251);
              "
            >
              <p>&copy; Digital Innovation Festival. All rights reserved</p>
            </div>
          </div>
        </div>
      </section>
    </main>`;
      const result = await this.mail.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_INIT,
            },
            To: [
              {
                Email: emailForm.emailDestination,
              },
            ],
            Subject: "Digital Innovation Festival",
            TextPart: emailForm.message,
            HTMLPart: template,
          },
        ],
      });
      if (result) {
        const status = result.body;
        console.log("mail send");
        return status;
      } else {
        console.log("mail not send");
        throw new InternalServerErrorException("mail not send");
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
