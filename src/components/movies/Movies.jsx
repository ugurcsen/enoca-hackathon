import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function Movies() {
    let api_key = "83f14900c3d2651f24c4cf557babcc7d"
    const [type, setType] = useState("now_playing")
    const [movies, setMovies] = useState([]);
    const getMovies = async (movie_type) => {
        setType(movie_type)
        axios.get("https://api.themoviedb.org/3/movie/" + movie_type, {
            params: {
                api_key: api_key,
                language: "en-US",
                page: 1
            }
        })
            .then(data => {
                setMovies(data.data.results)
            })
    }

    useEffect(() => {
        getMovies(type)
    }, []);
    return (
        <div className="movies-block">
            <div className="button-group">
                <button onClick={(e) => {
                    getMovies("now_playing")
                }} className={type == "now_playing" ? "active" : ""}>Now playing
                </button>
                <button onClick={(e) => {
                    getMovies("upcoming")
                }} className={type == "upcoming" ? "active" : ""}>Upcoming
                </button>
                <button onClick={() => {
                    getMovies("top_rated")
                }} className={type == "top_rated" ? "active" : ""}>Top rated
                </button>
                <button onClick={() => {
                    getMovies("popular")
                }} className={type == "popular" ? "active" : ""}>Popular
                </button>
            </div>
            <div className="movies">
                {movies.map((movie, index) => (
                    <div className="movie" key={index}>
                        <Link href={`/movie/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}