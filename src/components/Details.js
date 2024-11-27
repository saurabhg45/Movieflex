import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Details() {
  const [movie, setmovie] = useState({});
  const [cast, setcast] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const movie_id = searchParams.get("q");
  console.log(movie_id);

  const Api_key = "c45a857c193f6302f2b5061c3b85e743";

  //ttps://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US
  const fetchMovie = async (movie_id) => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
      );
      console.log();
      setmovie(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US

  const fetchMovieCast = async () => {
    try {
      let result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
      );
      console.log(result.data.cast);
      setcast(result.data.cast);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie(movie_id);
    fetchMovieCast();
  }, [movie_id]);

  return (
    <div className="container mt-5 mb-5 moviedetails">
      <div className="row mt-5 mb-5">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="img-fluid"
              />
            </div>

            <div className="col-xl-9">
              <h4>{movie.title}</h4>
              <p>
                Rating: <strong>{movie.vote_average}</strong>
              </p>
              <p>{movie.runtime} mins</p>
              <p>
                <div>
                  {movie.genres &&
                    movie.genres.length > 0 &&
                    movie.genres.map((genre) => genre.name).join(",")}
                </div>
              </p>
              <p>Release Date : {movie.release_date}</p>
              <div>
                <h5>Overview</h5>
                <p className="over">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt=""
            className="img-fluid"
          />
        </div>
      </div>
      <h2>Cast</h2>
      <div className="row">
        {cast &&
          cast.length > 0 &&
          cast.map((cast) => {
            return (
              <div className="col-xl-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt=""
                  className="img-fluid"
                />
                <p>
                  <strong>{cast.name}</strong>
                </p>
                <p>Character: {cast.character}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
