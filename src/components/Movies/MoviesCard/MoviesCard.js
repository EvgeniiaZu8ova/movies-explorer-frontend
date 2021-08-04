import { React, useState } from "react";

import { useLocation } from "react-router";

import iconSave from "../../../images/icon-save.svg";
import iconSaveActive from "../../../images/icon-save-active.svg";
import iconDelete from "../../../images/close-icon.svg";

import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const { nameRU, duration, image } = movie;

  const hours = duration && Math.floor(duration / 60);
  const minutes = duration && duration - hours * 60;

  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  const saveIconClassName = isSaved
    ? "article__icon-block article__icon-block_active"
    : "article__icon-block";

  function onSaveClick() {
    if (location.pathname !== "/saved-movies") {
      if (isSaved) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }
    }
  }

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__description">
          <h3 className="article__title">{nameRU}</h3>
          <p className="article__subtitle">
            {hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}
          </p>
        </div>
        <div className={saveIconClassName} onClick={onSaveClick}>
          {location.pathname === "/saved-movies" ? (
            <img
              src={iconDelete}
              alt="Иконка удаления"
              className="article__icon"
            />
          ) : (
            <img
              src={isSaved ? iconSaveActive : iconSave}
              alt="Иконка сохранения"
              className="article__icon"
            />
          )}
        </div>
      </div>
      <img
        src={`https://api.nomoreparties.co${image.url}`}
        alt="Картинка карточки"
        className="article__image"
      />
    </div>
  );
}

export default MoviesCard;
