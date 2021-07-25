import React from "react";

import iconSave from "../../../images/icon-save.svg";
import cardImage from "../../../images/card-img.jpg";

import "./MoviesCard.css";

function MoviesCard(props) {
  return (
    <div className="article">
      <div className="article__header">
        <div className="article__description">
          <h3 className="article__title">33 слова о дизайне</h3>
          <p className="article__subtitle">1ч 47м</p>
        </div>
        <div className="article__icon-block">
          <img
            src={iconSave}
            alt="Иконка сохранения"
            className="article__icon"
          />
        </div>
      </div>
      <img src={cardImage} alt="Картинка карточки" className="article__image" />
    </div>
  );
}

export default MoviesCard;
