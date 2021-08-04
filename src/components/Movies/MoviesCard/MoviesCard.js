import { React, useState } from "react";

import { useLocation } from "react-router";

import iconSave from "../../../images/icon-save.svg";
import iconSaveActive from "../../../images/icon-save-active.svg";
import iconDelete from "../../../images/close-icon.svg";

import "./MoviesCard.css";

function MoviesCard({ movie, onClick }) {
  const { nameRU, duration, image, trailerLink, trailer } = movie;
  const finalTrailerLink = trailerLink ? trailerLink : trailer;

  const [isSaved, setIsSaved] = useState(false);

  const location = useLocation();

  const movieImage =
    location.pathname === "/saved-movies"
      ? image
      : `https://api.nomoreparties.co${image.url}`;

  const hours = duration && Math.floor(duration / 60);
  const minutes = duration && duration - hours * 60;

  const saveIconClassName = isSaved
    ? "article__icon-block article__icon-block_active"
    : "article__icon-block";

  function handleClick(e) {
    if (location.pathname === "/movies") {
      setIsSaved((prev) => !prev);
    }

    const movieName = e.target
      .closest(".article")
      .querySelector(".article__title").textContent;

    onClick(movieName);
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
        <div className={saveIconClassName} onClick={handleClick}>
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
      <a href={finalTrailerLink} target="_blank" rel="noreferrer">
        <img
          src={movieImage}
          alt="Картинка карточки"
          className="article__image"
        />
      </a>
    </div>
  );
}

export default MoviesCard;
