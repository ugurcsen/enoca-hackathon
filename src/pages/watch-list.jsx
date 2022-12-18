import Head from "next/head";
import Header from "../components/Header";

export default function WatchList({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Watch List</title>
            </Head>

            <Header text="Watch List" />
        </>
    )
}