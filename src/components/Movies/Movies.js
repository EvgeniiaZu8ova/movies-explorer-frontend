import { React, useState, useEffect } from "react";

import "./Movies.css";

import moviesApi from "../../utils/MoviesApi";

import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ myMovies, onSave, onDelete }) {
  const [searchMovieInput, setSearchMovieInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);

  function getSearchMovieInput(input) {
    setSearchMovieInput(input.toLowerCase());
    setIsSearchActive(true);
  }

  function handleCheckboxClick() {
    setIsCheckboxActive((prev) => !prev);
  }

  function checkIsMovieSaved(movies, myMovies) {
    return movies.map((el) => {
      let isSaved;

      if (myMovies.find((item) => item.nameRU === el.nameRU)) {
        isSaved = true;
      } else {
        isSaved = false;
      }

      el.isSaved = isSaved;

      return el;
    });
  }

  useEffect(() => {
    const storageFilms = JSON.parse(localStorage.getItem("savedMoviesSearch"));

    if (storageFilms) {
      const finalMovies = checkIsMovieSaved(storageFilms, myMovies);
      setMovies(finalMovies);

      localStorage.setItem("savedMoviesSearch", JSON.stringify(finalMovies));
    }
  }, [myMovies]);

  useEffect(() => {
    if (searchMovieInput === "") {
      return null;
    } else {
      setIsLoading(true);

      moviesApi
        .getBeatfilmMovies()
        .then((res) => {
          setIsLoading(false);

          const filteredMovies = filterMovies(res, searchMovieInput);

          setMovies(filteredMovies);

          localStorage.setItem(
            "savedMoviesSearch",
            JSON.stringify(filteredMovies)
          );

          setIsCheckboxActive(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingSuccess(false);
        });
    }
  }, [searchMovieInput]);

  useEffect(() => {
    const storageFilms = JSON.parse(localStorage.getItem("savedMoviesSearch"));
    const filteredShortMovies = storageFilms && filterShortMovies(storageFilms);

    const finalMovies =
      isCheckboxActive === true ? filteredShortMovies : storageFilms;

    if (storageFilms) {
      setMovies(finalMovies);
    }
  }, [isCheckboxActive]);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onSearchClick={getSearchMovieInput} />
        <FilterCheckbox
          isChecked={isCheckboxActive}
          onClick={handleCheckboxClick}
        />
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          isLoadingSuccess={isLoadingSuccess}
          isSearchActive={isSearchActive}
          onSave={onSave}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
}

export default Movies;
