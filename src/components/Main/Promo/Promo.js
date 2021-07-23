import React from "react";

import "./Promo.css";
import landingLogo from "../../../images/text__COLOR_landing-logo.svg";

function Promo(props) {
  return (
    <section className="section promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img src={landingLogo} alt="Логотип лендинга" className="promo__logo" />
      </div>
    </section>
  );
}

export default Promo;
