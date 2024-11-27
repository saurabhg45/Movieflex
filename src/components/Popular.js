import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Popular() {
  const [movies, setmovies] = useState([]);
  const [page, setpage] = useState(1);
  const navigate = useNavigate();

  //https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1

  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const fetchPopularMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`
      )
      .then((response) => {
        console.log(response.data.results);
        setmovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePre = () => {
    if (page > 1) {
      setpage(page - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleNext = () => {
    setpage(page + 1);
    window.scrollTo(0, 0);
  };

  const handleMovie = (id) => {
    console.log(id);
    navigate(`/movie?q=${id}`);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [page]);

  return (
    <div className="container">
      <h1 className="heading">Popular Movie</h1>
      <div className="row  mb-3 mt-3">
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => {
            return (
              <div
                className="col-xl-3 single"
                onClick={() => handleMovie(movie.id)}
              >
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
      {movies.length > 0 && (
        <div className="pagination">
          <button className="btn btn-danger" onClick={handlePre}>
            Previous
          </button>
          <button className="btn btn-danger">{page}</button>
          <button className="btn btn-danger" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
