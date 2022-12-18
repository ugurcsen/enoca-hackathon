import 'bootstrap/dist/css/bootstrap.css'
import '../../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function MyApp({Component, pageProps}) {
    let router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true);
        };
        const handleComplete = () => {
            setIsLoading(false);
        };
        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    }, [router]);

    if (isLoading) {
        return (
            <img className="loader" width={189} src="/loader.png"/>
        )
    }
    return (
        <>
            <Head>
                <title>Enoca Hackaton</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Component {...pageProps} />
                <Footer NavRef={router.pathname}/>
            </main>
        </>
    )
}