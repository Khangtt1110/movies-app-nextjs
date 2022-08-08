import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import CallBackButton from "../components/callBackButton/callBackButton";
import Footer from "../components/footer/index";
import { store } from "../features/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    const [headerLog, setHeaderLog] = useState(false);
    const router = useRouter();
    // check router pathname
    useEffect(() => {
        if (router.pathname === "/[category]/[name]") {
            setHeaderLog(false);
        } else {
            setHeaderLog(true);
        }
    }, [router.pathname]);

    return (
        <Provider store={store}>
            <div className="container">
                {/* {headerLog ? <Header /> : <CallBackButton />} */}
                {headerLog ? null : <CallBackButton />}

                <Component {...pageProps} />
                <Footer />
            </div>
        </Provider>
    );
}

export default MyApp;
