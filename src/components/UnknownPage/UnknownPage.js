import React from "react";

import "./UnknownPage.css";

function UnknownPage(props) {
  return (
    <section className="unknown">
      <div className="unknown__container">
        <h2 className="unknown__title">404</h2>
        <h3 className="unknown__subtitle">Страница не найдена</h3>
        <a href="#" className="unknown__link">
          Назад
        </a>
      </div>
    </section>
  );
}

export default UnknownPage;
