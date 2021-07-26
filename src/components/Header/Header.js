import React from "react";

import "./Header.css";
import logo from "../../images/logo.svg";

import NavTab from "../NavTab/NavTab";

function Header({ location, onMenuClick }) {
  let headerClassname;

  switch (location) {
    case "/movies":
      headerClassname = "header header_movies";
      break;
    case "/saved-movies":
      headerClassname = "header header_movies";
      break;
    case "/profile":
      headerClassname = "header header_movies";
      break;
    case "/":
      headerClassname = "header";
      break;
    default:
      headerClassname = "header header_hidden";
  }

  return (
    <header className={headerClassname}>
      <div className="header__container">
        <img src={logo} alt="Логотип" className="header__logo" />
        <NavTab location={location} onMenuClick={onMenuClick} />
      </div>
    </header>
  );
}

export default Header;
