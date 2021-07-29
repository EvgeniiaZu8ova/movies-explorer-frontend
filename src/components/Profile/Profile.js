import React from "react";

import { Link } from "react-router-dom";

import "./Profile.css";

function Profile({ userName = "Евгения" }) {
  return (
    <section className="profile">
      <form noValidate className="profile__form">
        <h2 className="profile__title">Привет, {userName}!</h2>
        <div className="profile__input-area">
          <label className="profile__label">Имя</label>
          <input
            name="userName"
            type="text"
            defaultValue="Евгения"
            className="profile__input"
          />
        </div>
        <div className="profile__input-area">
          <label className="profile__label">E-mail</label>
          <input
            name="userEmail"
            type="email"
            defaultValue="pochta@yandex.ru"
            className="profile__input"
          />
        </div>
        <button type="submit" className="profile__button">
          Редактировать
        </button>
        <Link to="/">
          <button type="reset" className="profile__button profile__button_red">
            Выйти из аккаунта
          </button>
        </Link>
      </form>
    </section>
  );
}

export default Profile;
