import "./SavedMovies.css";

import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies(props) {
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

export default SavedMovies;
