import { React, useState, useEffect } from "react";

import "./Movies.css";

import moviesApi from "../../utils/MoviesApi";

import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
  const [searchMovieInput, setSearchMovieInput] = useState("");
  const [movies, setMovies] = useState([]);

  function getSearchMovieInput(input) {
    setSearchMovieInput(input.toLowerCase());
  }

  useEffect(() => {
    if (searchMovieInput === "") {
      return null;
    } else {
      moviesApi
        .getBeatfilmMovies()
        .then((res) => {
          setMovies(
            res.filter((el) => {
              const filmNameRU = el.nameRU && el.nameRU.toLowerCase();
              const filmNameEN = el.nameEN && el.nameEN.toLowerCase();

              return (
                (filmNameRU && filmNameRU.includes(searchMovieInput)) ||
                (filmNameEN && filmNameEN.includes(searchMovieInput))
              );
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [searchMovieInput]);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onSearchClick={getSearchMovieInput} />
        <FilterCheckbox />
        <MoviesCardList movies={movies} />
      </div>
    </section>
  );
}

export default Movies;
