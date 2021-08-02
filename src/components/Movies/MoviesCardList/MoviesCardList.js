import { React, useState, useEffect } from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let maxCardsQuantity;

  switch (true) {
    case screenWidth > 319 && screenWidth < 768:
      maxCardsQuantity = 5;
      break;
    case screenWidth > 767 && screenWidth < 1280:
      maxCardsQuantity = 8;
      break;
    case screenWidth > 1279:
      maxCardsQuantity = 12;
      break;
    default:
      maxCardsQuantity = 5;
  }

  useEffect(() => {
    function onResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <section className="elements">
      <div className="elements__container">
        {movies
          .map((el, index) => <MoviesCard key={index} movie={el} />)
          .slice(0, maxCardsQuantity)}
      </div>
      <div className="elements__pagination">
        <button className="elements__button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
