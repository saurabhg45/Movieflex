import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Search() {
  const movie_name = useSelector((state) => state.search.value);
  console.log(movie_name);

  const [movies, setmovies] = useState([]);

  console.log(movie_name);
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  //ttps://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1

  const fetchSearchMovie = async (movie_name) => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1`
      );
      console.log(res.data.results);
      setmovies(res.data.results);
    } catch (e) {
      console.log("Movie Not Found");
    }
  };

  useEffect(() => {
    fetchSearchMovie(movie_name);
  }, [movie_name]);

  return (
    <div className="container">
      <h1 className="heading">Search Results {movie_name}</h1>
      <div className="row  mb-3 mt-3">
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => {
            return (
              <div className="col-xl-3 ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="img-fluid card"
                />

                <h4 className="h4">{movie.title}</h4>
                <p className="p">
                  Rating: <strong>{movie.vote_average}</strong>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
