import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../themes/theme";
import { GlobalStyles } from "../globalstyle/globalStyle";

const MyApp = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <>
      <Head>
        <title>Eblog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextNProgress color="red" height={3} showOnShallow={true} />
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Nav toggleTheme={toggleTheme} isDark={isDarkTheme} />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
