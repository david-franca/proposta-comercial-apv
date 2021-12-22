import "../styles/globals.css";

import { Fragment } from "react";

import { CssBaseline } from "@nextui-org/react";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
