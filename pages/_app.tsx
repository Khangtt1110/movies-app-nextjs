import { Typography } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import CallBackButton from "../components/callBackButton/callBackButton";
import Footer from "../components/footer/index";
import ScrollToTop from "../components/scrollToTop";
import { store } from "../features/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    const [headerLog, setHeaderLog] = useState(false);
    const router = useRouter();
    // check router pathname
    useEffect(() => {
        if (router.pathname === "/[category]/[name]" || router.pathname === "/actor/[name]") {
            setHeaderLog(false);
        } else {
            setHeaderLog(true);
        }
    }, [router.pathname]);
    return (
        <Provider store={store}>
            {/* <Typography className="container"> */}
            <ScrollToTop />
            {/* {headerLog ? <Header /> : <CallBackButton />} */}
            {headerLog ? null : <CallBackButton />}
            <Component {...pageProps} />
            {/* <Footer /> */}
            {/* </Typography> */}
        </Provider>
    );
}

export default MyApp;
