import React, { useRef } from "react";
///rfc shortcut for creating simple function

import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/MovieFlixLogo.png";
import { useDispatch } from "react-redux";
import { getSearchQuery } from "../store/slices/searchSlice";

export default function Header() {
  const title = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(title.current.value);
    dispatch(getSearchQuery(title.current.value));
    navigate("/search");

    document.querySelector(".ibox").value = "";
  };
  return (
    <div className="p-3 mb-2 bg-danger text-white">
      <nav class="navbar navbar-expand-lg bg-danger">
        <div class="container-fluid">
          <Link class="navbar-brand text-white" to="/popular">
            <img src={logo} alt="" width={140} />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 menus">
              <li class="nav-item">
                <Link class="nav-link active" to="/popular">
                  Popular
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/toprated">
                  Top Rated
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="upcoming">
                  Upcoming
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search" onSubmit={handleSearch}>
              <input
                class="form-control me-2 ibox"
                type="search"
                placeholder="Search Movie"
                aria-label="Search"
                ref={title}
              />
              <button class="btn btn-outline-dark" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
