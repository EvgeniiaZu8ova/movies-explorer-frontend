import React from "react";
import { Link } from "react-router-dom";

import "./UserEntryForm.css";

import logo from "../../images/logo.svg";

function UserEntryForm({
  title,
  isPathSignUp,
  buttonTitle,
  question,
  linkPath,
  linkText,
}) {
  return (
    <section className="section entry">
      <div className="entry__container">
        <img src={logo} alt="Логотип проекта" className="entry__logo" />
        <form noValidate className="entry__form">
          <h2 className="entry__title">{title}</h2>
          {isPathSignUp && (
            <>
              <label className="entry__label">Имя</label>
              <input
                name="userName"
                type="text"
                defaultValue="Евгения"
                className="entry__input"
              />
            </>
          )}
          <label className="entry__label">E-mail</label>
          <input
            name="userEmail"
            type="email"
            defaultValue="pochta@yandex.ru"
            className="entry__input"
          />
          <label className="entry__label">Пароль</label>
          <input name="userPassword" type="password" className="entry__input" />
          <button type="submit" className="entry__button">
            {buttonTitle}
          </button>
          <p className="entry__paragraph">
            {question}
            <Link to={linkPath} className="entry__link">
              {linkText}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default UserEntryForm;
