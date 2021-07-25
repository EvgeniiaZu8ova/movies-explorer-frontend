import React from "react";

import "./Movies.css";

import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList />
      </div>
    </section>
  );
}

export default Movies;
