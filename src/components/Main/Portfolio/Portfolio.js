import React from "react";

import "./Portfolio.css";

import avatar from "../../../images/avatar.png";
import arrow from "../../../images/text__COLOR_landing-arrow.svg";

function Portfolio(props) {
  return (
    <section className="section portfolio">
      <div className="portfolio__container">
        <div className="section__header">Студент</div>
        <div className="portfolio__info">
          <div className="portfolio__about">
            <h2 className="portfolio__title">Евгения</h2>
            <h3 className="portfolio__subtitle">
              Фронтенд-разработчик, 27 лет
            </h3>
            <p className="portfolio__paragraph">
              Год училась на курсе по веб-разработке от Яндекс.Практикума,
              совершенствуюсь в написании SPA-приложений. По образованию я
              геолог-нефтяник, работала по специальности в Санкт-Петербурге.
              Сейчас живу в ОАЭ.
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
        <div className="portfolio__projects">
          <p className="portfolio__text">Портфолио</p>
          <div className="portfolio__links">
            <div className="portfolio__link">
              <a
                target="_blank"
                href="https://evgeniiazu8ova.github.io/how-to-learn/"
                rel="noreferrer"
                className="portfolio__project"
              >
                Статичный сайт
              </a>
              <a
                target="_blank"
                href="https://evgeniiazu8ova.github.io/how-to-learn/"
                rel="noreferrer"
              >
                <img
                  src={arrow}
                  className="portfolio__icon"
                  alt="Иконка для ссылки на проект"
                />
              </a>
            </div>
            <div className="portfolio__link">
              <a
                target="_blank"
                href="https://evgeniiazu8ova.github.io/russian-travel/"
                rel="noreferrer"
                className="portfolio__project"
              >
                Адаптивный сайт
              </a>
              <a
                target="_blank"
                href="https://evgeniiazu8ova.github.io/russian-travel/"
                rel="noreferrer"
              >
                <img
                  src={arrow}
                  className="portfolio__icon"
                  alt="Иконка для ссылки на проект"
                />
              </a>
            </div>
            <div className="portfolio__link">
              <a
                target="_blank"
                href="https://evzu8ova.students.nomoredomains.club"
                rel="noreferrer"
                className="portfolio__project"
              >
                Одностраничное приложение
              </a>
              <a
                target="_blank"
                href="https://evzu8ova.students.nomoredomains.club"
                rel="noreferrer"
              >
                <img
                  src={arrow}
                  className="portfolio__icon"
                  alt="Иконка для ссылки на проект"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
