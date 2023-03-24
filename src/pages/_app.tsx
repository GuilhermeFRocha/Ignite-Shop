import type { AppProps } from "next/app";
import Image from "next/image";

import logoImg from "../assets/Logo.svg";
import { Container, Header } from "../styles/pages/app";
import { globalStyles } from "../styles/global";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
