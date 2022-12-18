import Link from "next/link";
import styles from '../../styles/Home.module.css';
import Head from "next/head";
import {useEffect} from "react";
import TopRatedMovies from "../components/movies/TopRatedMovies";
import Movies from "../components/movies/Movies";
import SearchButton from "../components/SearchButton";
import {useRouter} from "next/router";

export default function Homepage() {
    const router = useRouter()

    return (
        <>
            <br />
            <SearchButton text="What do you want to watch?" onSubmit={(e) => {
                e.preventDefault()
                router.push("/search?s=" + e.currentTarget.s.value)
            }}/>
            <TopRatedMovies/>
            <Movies/>
        </>
    )
}