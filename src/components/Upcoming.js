import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Upcoming() {
  const [movies, setmovies] = useState([]);
  const [page, setpage] = useState(1);

  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const fetchPopularMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=${page}`
      )
      .then((response) => {
        console.log(response);
        setmovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePre = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };
  const handleNext = () => {
    setpage(page + 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [page]);
  return (
    <div className="container">
      <h1 className="heading">Upcoming Movie</h1>
      <div className="row">
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => {
            return (
              <div className="col-xl-3">
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
