import React from "react";

import "./Navigation.css";

import profileIcon from "../../images/profile-icon.svg";

function Navigation({ location }) {
  return (
    <>
      {location === "/main" ? (
        <nav className="header__menu">
          <button className="header__link header__link_white">
            Регистрация
          </button>
          <button className="header__link header__link_green">Войти</button>
        </nav>
      ) : (
        <>
          <div className="header__icon-menu">
            <span className="header__icon-menu-span" />
          </div>
          <nav className="header__main-menu">
            <button className="header__link header__link_black header__link_active">
              Фильмы
            </button>
            <button className="header__link header__link_black">
              Сохранённые фильмы
            </button>
            <div className="header__button">
              <img
                src={profileIcon}
                alt="Иконка личного кабинета"
                className="header__profile-icon"
              />
              <button className="header__link header__link_button">
                Аккаунт
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Navigation;
