import type { AppProps } from "next/app";
import Headers from "../components/Headers";

import { Container } from "../styles/pages/app";
import { globalStyles } from "../styles/global";

import { ContextoProvider } from "../contexts/Context";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <Container>
      <ContextoProvider>
        <Headers />
        <Component {...pageProps} />
      </ContextoProvider>
    </Container>
  );
}
