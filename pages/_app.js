import 'babel-polyfill';
import Head from "next/head";
import App from "next/app";
import "../styles/globals.css";
import { GlobalContextProv } from "../appContext";
import { blogsApi } from "../lib/api";

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
        <meta
          name="application-name"
          content="MAPID (Multi Areal Planing Indonesia)"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <GlobalContextProv global={global}>
        <Component {...pageProps} />
      </GlobalContextProv>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const response = await blogsApi()
  const global = await response.data;
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
