import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer/index";
import "../styles/globals.scss";
import { store } from "../features/store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div className="container">
                <Header />
                <Component {...pageProps} />
                <Footer />
            </div>
        </Provider>
    );
}

export default MyApp;
