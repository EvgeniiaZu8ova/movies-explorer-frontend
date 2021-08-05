import React from "react";

import "./AboutMe.css";

import avatar from "../../../images/avatar.png";

function AboutMe() {
  return (
    <div className="portfolio__info">
      <div className="portfolio__about">
        <h2 className="portfolio__title">Евгения</h2>
        <h3 className="portfolio__subtitle">Фронтенд-разработчик, 27 лет</h3>
        <p className="portfolio__paragraph">
          Год училась на курсе по веб-разработке от Яндекс.Практикума,
          совершенствуюсь в написании SPA-приложений. По образованию я геолог,
          работала по специальности в Санкт-Петербурге. Сейчас живу в ОАЭ.
        </p>
        <div className="portfolio__contacts">
          <a
            target="_blank"
            href="https://www.facebook.com/evgeniya.zubova.71"
            className="portfolio__contact"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            target="_blank"
            href="https://github.com/EvgeniiaZu8ova"
            className="portfolio__contact"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
      <img
        src={avatar}
        alt="Фотография студента"
        className="portfolio__photo"
      />
    </div>
  );
}

export default AboutMe;
