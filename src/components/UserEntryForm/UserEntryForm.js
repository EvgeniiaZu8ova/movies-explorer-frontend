import React from "react";

import "./UserEntryForm.css";

import logo from "../../images/logo.svg";

function UserEntryForm({
  title,
  isPathSignUp,
  buttonTitle,
  question,
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
              <label for="userName" className="entry__label">
                Имя
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                defaultValue="Виталий"
                className="entry__input"
              />
            </>
          )}
          <label for="userEmail" className="entry__label">
            E-mail
          </label>
          <input
            id="userEmail"
            name="userEmail"
            type="email"
            defaultValue="pochta@yandex.ru"
            className="entry__input"
          />
          <label for="userPassword" className="entry__label">
            Пароль
          </label>
          <input
            id="userPassword"
            name="userPassword"
            type="password"
            className="entry__input"
          />
          <button type="submit" className="entry__button">
            {buttonTitle}
          </button>
          <p className="entry__paragraph">
            {question}
            <a href="#" className="entry__link">
              {linkText}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default UserEntryForm;
