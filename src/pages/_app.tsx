import "../styles/globals.css";

import { Fragment } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { CssBaseline } from "@nextui-org/react";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
