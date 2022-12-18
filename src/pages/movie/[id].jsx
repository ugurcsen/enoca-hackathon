import {useRouter} from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import axios from "axios";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faClock, faStar, faTicket} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

export default function Movie() {
    let api_key = "83f14900c3d2651f24c4cf557babcc7d"
    const router = useRouter()
    const [movie, setMovie] = useState(null)
    const [reviews, setReviews] = useState([])
    const [casts, setCasts] = useState([])
    const [type, setType] = useState("about_movie")
    const {id} = router.query

    const getReviews = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
            params: {
                api_key: api_key,
                language: "en-US",
                page: 1
            }
        }).then(data => {
            setReviews(data.data.results)
        })
    }

    const getCasts = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: {
                api_key: api_key,
                language: "en-US",
                page: 1
            }
        }).then(data => {
            setCasts(data.data.cast)
        })
    }
    const getDetails = () => {
        switch (type) {
            case "about_movie":
                return movie.overview
            case "cast":
                return (
                    <div className="row casts">
                        {casts.map((cast, index) => (
                            <div key={index} className="col-6 col-md-4 col-lg-3">
                                <div className="circle-image-container">
                                    <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} alt={cast.name}/>
                                </div>
                                <span>{cast.name}</span>
                            </div>
                        ))}
                    </div>
                )
            case "reviews":
                if (reviews.length === 0) {
                    return "No reviews yet"
                }
                return (
                    <div className="reviews">
                        {reviews.map((review, index) => (
                            <div key={index} className="review row">
                                <div className="col-4 text-center">
                                    <div className="circle-image-container">
                                        <img src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                                             alt={review.author}/>
                                    </div>
                                    <span className="review-rating">{review.author_details.rating}</span>
                                </div>
                                <div className="col-8">
                                    <h4>{review.author}</h4>
                                    <p>{review.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            default:
                return;
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`https://api.themoviedb.org/3/movie/` + id, {
                params: {
                    api_key: api_key,
                    language: "en-US",
                }
            }).then(data => {
                setMovie(data.data)
            })
        }
    }, [id])

    if (movie === null) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Head>
                <title>{movie.title}</title>
            </Head>

            <Header bookmark={true} text={movie.title.length > 17 ? movie.title.substring(0, 17) + "..." : movie.title}/>

            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title}/>
            </div>
            <div className="search-results container position-relative" style={{marginTop: "-80px"}}>
                <div className="row">
                    <div className="movie col-4">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    </div>
                    <div className="col-8 mt-3" style={{paddingTop: "80px"}}>
                        <h2>{movie.title}</h2>
                    </div>
                </div>

                <div className={"movie-info mt-2"}>
                    <span><FontAwesomeIcon icon={faTicket}/> {movie.genres[0]?.name} | </span>
                    <span><FontAwesomeIcon icon={faCalendar}/> {(new Date(movie.release_date)).getFullYear()} | </span>
                    <span><FontAwesomeIcon icon={faClock}/> {movie.runtime}</span>
                </div>
                <div className="movie-poster-overlay orange-star">
                    <FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div className="movies-block">
                <div className="button-group">
                    <button onClick={(e) => {
                        setType("about_movie")
                    }} className={type == "about_movie" ? "active" : ""}>About Movie
                    </button>
                    <button onClick={(e) => {
                        getReviews()
                        setType("reviews")
                    }} className={type == "reviews" ? "active" : ""}>Reviews
                    </button>
                    <button onClick={() => {
                        getCasts()
                        setType("cast")
                    }} className={type == "cast" ? "active" : ""}>Cast
                    </button>
                </div>
                <div className="movie-detail mt-4">
                    {getDetails()}
                </div>
            </div>
        </>
    )
}