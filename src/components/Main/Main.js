import React from "react";

import "./Main.css";

import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return (
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  );
}

export default Main;
