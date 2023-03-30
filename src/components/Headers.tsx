import BagBuy from "../assets/Buy.svg";
import logoImg from "../assets/Logo.svg";
import Image from "next/image";

import React from "react";

import { useContext } from "react";
import { Contexto } from "../contexts/Context";

import { BagHeader, Head } from "../styles/pages/app";
import Link from "next/link";

const Headers = () => {
  const { state, setOpenModal, isOpenModal } = useContext(Contexto);

  function handleOpen() {
    setOpenModal(!isOpenModal);
  }

  return (
    <Head>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <BagHeader onClick={handleOpen}>
        <Image src={BagBuy} alt="" />
        <p>{state}</p>
      </BagHeader>
    </Head>
  );
};

export default Headers;
