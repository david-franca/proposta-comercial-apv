import "moment/locale/pt-br";
import "../styles/globals.css";

import moment from "moment";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { ChakraProvider } from "@chakra-ui/react";

import { auth } from "../firebase";

import type { AppProps } from "next/app";
moment.updateLocale("pt-br", {});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
