import React from "react";

import "./SearchForm.css";

function SearchForm(props) {
  return (
    <form noValidate name="movie-search-form" className="movie__search-form">
      <input
        name="movie-search"
        type="text"
        placeholder="Фильм"
        className="movie__search-input"
      />
      <button type="submit" className="movie__search-button">
        Найти
      </button>
    </form>
  );
}

export default SearchForm;
