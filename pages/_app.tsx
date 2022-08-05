import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer/index";
import "../styles/globals.scss";
import { store } from "../features/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const [headerLog, setHeaderLog] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (router.pathname === "/") {
            setHeaderLog(true);
        } else {
            setHeaderLog(false);
        }
    }, [router.pathname]);
    return (
        <Provider store={store}>
            <div className="container">
                {headerLog && <Header />}
                <Component {...pageProps} />
                <Footer />
            </div>
        </Provider>
    );
}

export default MyApp;
