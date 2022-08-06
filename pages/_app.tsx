import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer/index";
import "../styles/globals.scss";
import { store } from "../features/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CallBackButton from "../components/callBackButton/callBackButton";

function MyApp({ Component, pageProps }: AppProps) {
    const [headerLog, setHeaderLog] = useState(false);
    const router = useRouter();
    // check router pathname
    useEffect(() => {
        if (router.pathname.split("/").length > 2) {
            setHeaderLog(false);
        } else {
            setHeaderLog(true);
        }
    }, [router.pathname]);
    return (
        <Provider store={store}>
            <div className="container">
                {headerLog ? <Header /> : <CallBackButton />}
                <Component {...pageProps} />
                <Footer />
            </div>
        </Provider>
    );
}

export default MyApp;
