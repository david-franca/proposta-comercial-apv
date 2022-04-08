import "moment/locale/pt-br";
import "../styles/globals.css";

import moment from "moment";
import { FuegoProvider } from "swr-firestore-v9";

import { ChakraProvider } from "@chakra-ui/react";

import { AppContextInterface } from "../@types/interfaces";
import { fuego } from "../firebase";
import { AuthProvider } from "../hooks/useAuth";
import AuthStateChanged from "../layout/AuthStateChanged";

import type { AppProps } from "next/app";
moment.updateLocale("pt-br", null);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider value={{} as AppContextInterface}>
        <AuthStateChanged>
          <FuegoProvider fuego={fuego}>
            <Component {...pageProps} />
          </FuegoProvider>
        </AuthStateChanged>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
