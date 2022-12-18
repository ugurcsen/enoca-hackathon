import SearchButton from "../components/SearchButton";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import Link from "next/link";
import {faCalendar, faClock, faStar, faTicket} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Header from "../components/Header";

export default function Search() {
    let api_key = "83f14900c3d2651f24c4cf557babcc7d"
    const router = useRouter();
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (router.query.s !== undefined) {
            makeSearch(router.query.s)
        }
    }, [router.query])

    const updateSearch = (search_term) => {
        router.push(`/search?s=${search_term}`)
    }
    const makeSearch = async (search_term) => {
        axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: api_key,
                language: "en-US",
                query: search_term,
                include_adult: true,
                page: 1
            }
        })
            .then(data => {
                Promise.all(data.data.results.map(async (movie, index) => {
                    await axios.get(`https://api.themoviedb.org/3/movie/` + movie.id, {
                        params: {
                            api_key: api_key,
                            language: "en-US",
                        }
                    }).then(dataDetail => {
                        data.data.results[index] = dataDetail.data
                    })
                })).then(() => {
                    setSearchResults(data.data.results)
                })
            })
    }

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>

            <Header info={true} text="Search" />
            <SearchButton onSubmit={(e) => {
                e.preventDefault()
                updateSearch(e.currentTarget.s.value)
            }}/>
            <div className="search-results container">
                {searchResults.length == 0 ? (
                    <>
                        <div className="search-results__no-results p-5 text-center">
                            <img className="mb-3" style={{width: "76px"}} src="/search-result.png"/>
                            <h4 className="mb-3">
                                We Are Sorry, We Can Not Find The Movie :(
                            </h4>
                            <span style={{color: "#92929D"}}>Find your movie by Type title, categories, years, etc </span>
                        </div>
                    </>
                ) : null}
                {searchResults.map((movie, index) => (
                    <div key={index} className="row search-result">
                        <div className="movie col-4">
                            <Link href={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                            </Link>
                        </div>
                        <div className="col-8">
                            <h3>{movie.title.length > 25 ? movie.title.substring(0, 25) + "..." : movie.title}</h3>
                            <span className="orange-star"><FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}</span>
                            <span><FontAwesomeIcon icon={faTicket} /> {movie.genres[0]?.name}</span>
                            <span><FontAwesomeIcon icon={faCalendar} /> {(new Date(movie.release_date)).getFullYear()}</span>
                            <span><FontAwesomeIcon icon={faClock} /> {movie.runtime}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}