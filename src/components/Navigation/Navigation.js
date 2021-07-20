import React from "react";

import "./Navigation.css";

function Navigation(props) {
  return (
    <nav className="header__menu">
      <button className="header__link header__link_white">Регистрация</button>
      <button className="header__link header__link_green">Войти</button>
    </nav>
  );
}

export default Navigation;
