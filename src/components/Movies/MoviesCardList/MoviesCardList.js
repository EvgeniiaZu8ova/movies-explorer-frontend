import { React, useState, useEffect } from "react";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
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

  function getCards() {
    let cardList = [];
    for (let i = 0; i < 15; i++) {
      cardList.push(<MoviesCard key={i} />);
    }
    return cardList;
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
        {getCards().slice(0, maxCardsQuantity)}
      </div>
      <div className="elements__pagination">
        <button className="elements__button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
