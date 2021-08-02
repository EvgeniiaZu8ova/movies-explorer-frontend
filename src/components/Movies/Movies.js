import { React, useState, useEffect } from "react";

import "./Movies.css";

import moviesApi from "../../utils/MoviesApi";

import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
  const [searchMovieInput, setSearchMovieInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  function getSearchMovieInput(input) {
    setSearchMovieInput(input.toLowerCase());
    setIsSearchActive(true);
  }

  useEffect(() => {
    const storageFilms = localStorage.getItem("savedMoviesSearch");

    if (storageFilms) {
      setMovies(JSON.parse(storageFilms));
    }
  }, []);

  useEffect(() => {
    if (searchMovieInput === "") {
      return null;
    } else {
      setIsLoading(true);

      moviesApi
        .getBeatfilmMovies()
        .then((res) => {
          setIsLoading(false);

          const filteredMovies = res.filter((el) => {
            const filmNameRU = el.nameRU && el.nameRU.toLowerCase();
            const filmNameEN = el.nameEN && el.nameEN.toLowerCase();

            return (
              (filmNameRU && filmNameRU.includes(searchMovieInput)) ||
              (filmNameEN && filmNameEN.includes(searchMovieInput))
            );
          });

          setMovies(filteredMovies);

          localStorage.setItem(
            "savedMoviesSearch",
            JSON.stringify(filteredMovies)
          );
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingSuccess(false);
        });
    }
  }, [searchMovieInput]);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onSearchClick={getSearchMovieInput} />
        <FilterCheckbox />
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          isLoadingSuccess={isLoadingSuccess}
          isSearchActive={isSearchActive}
        />
      </div>
    </section>
  );
}

export default Movies;
