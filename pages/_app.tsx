import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer/index";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="container">
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
