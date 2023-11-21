import { NextPage } from "next";
import * as React from "react";
import Image from "next/image";
import Logo from "./../../public/logo-digital-innovation-festival.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: NextPage = () => {
  const router = useRouter();
  const handleClick = (event: any) =>
    (event.detail === 2 && router.push("/admin/login")) ||
    router.push("http://digitalinnovationfestival.tech");

  return (
    <header>
      <div className="difContainer difFlex difHeader">
        <h1 id="difLogo">
          <button onClick={handleClick}>
            <Image alt="logo" width={200} height={50} src={Logo} />
          </button>
        </h1>
        <div
          id="difMainMenu"
          style={
            !router.asPath.includes("/admin") || router.asPath == "/admin/login"
              ? { display: "none" }
              : { display: "flex", flexWrap: "wrap" }
          }
          className="difFlex"
        >
          <Link href="/admin/participants">
            <a
              className={
                router.asPath == "/admin/participants" ? "difActive" : ""
              }
            >
              Liste des Participants
            </a>
          </Link>
          <Link href="/admin/statistics">
            <a
              className={
                router.asPath == "/admin/statistics" ? "difActive" : ""
              }
            >
              Stats des participants
            </a>
          </Link>
          <Link href="/admin/visitors">
            <a
              className={router.asPath == "/admin/visitors" ? "difActive" : ""}
            >
              Stats des contacts
            </a>
          </Link>
          <Link href="/admin">
            <a className={router.asPath == "/admin" ? "difActive" : ""}>
              Liste des Entreprises
            </a>
          </Link>
        </div>

        <div
          id="difMainMenu"
          style={
            router.asPath.includes("/admin") ||
            router.asPath.includes("/user/register") ||
            router.asPath.includes("/company") ||
            router.asPath.includes("/user/ticket")
              ? { display: "none" }
              : { display: "flex" }
          }
          className="difFlex"
        >
          <Link href="/user/register">
            <a className={router.asPath == "/user/register" ? "difActive" : ""}>
              S&#39;enregistrer pour l&#39;événement
            </a>
          </Link>
        </div>
        <div
          id="difMainMenu"
          style={
            router.asPath.includes("/user/")
              ? { display: "flex" }
              : { display: "none" }
          }
          className="difFlex"
        >
          <Link href="/">
            <a className={router.asPath == "/user/register" ? "difActive" : ""}>
              Toute les Entreprises
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
