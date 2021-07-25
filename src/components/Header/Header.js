import React from "react";

import "./Header.css";
import logo from "../../images/logo.svg";

import Navigation from "../Navigation/Navigation";

function Header({ location }) {
  const headerClassname =
    location === "/main" ? "header" : "header header_movies";

  return (
    <header className={headerClassname}>
      <div className="header__container">
        <img src={logo} alt="Логотип" className="header__logo" />
        <Navigation location={location} />
      </div>
    </header>
  );
}

export default Header;
