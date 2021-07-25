import React from "react";

import "./Footer.css";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__naming">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </div>
        <div className="footer__contacts">
          <p className="footer__year">&copy; 2021</p>
          <nav className="footer__links">
            <a
              target="_blank"
              href="https://praktikum.yandex.ru"
              rel="noreferrer"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
            <a
              target="_blank"
              href="https://github.com/yandex-praktikum"
              rel="noreferrer"
              className="footer__link"
            >
              Github
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/yandex.praktikum"
              rel="noreferrer"
              className="footer__link"
            >
              Facebook
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
