import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function TopRatedMovies() {
    let api_key = "83f14900c3d2651f24c4cf557babcc7d"
    const [top_rated_moviess, setTopRatedMovies] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
            params: {
                api_key: api_key,
                language: "en-US",
                page: 1
            }
        })
            .then(data => {
                setTopRatedMovies(data.data.results)
            })
    }, [])

    return (
        <div className="top-rated-movies">
            {top_rated_moviess.map((movie, index) => {
                return (
                    <div key={index}>
                        <Link href={`/movie/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                            <span>{index + 1}</span>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}