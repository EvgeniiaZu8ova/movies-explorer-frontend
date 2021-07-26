import React from "react";

import "./Profile.css";

function Profile({ userName = "Евгения" }) {
  return (
    <section className="profile">
      <form noValidate className="profile__form">
        <h2 className="profile__title">Привет, {userName}!</h2>
        <div className="profile__input-area">
          <label for="userName" className="profile__label">
            Имя
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            defaultValue="Евгения"
            className="profile__input"
          />
        </div>
        <div className="profile__input-area">
          <label for="userEmail" className="profile__label">
            E-mail
          </label>
          <input
            id="userEmail"
            name="userEmail"
            type="email"
            defaultValue="pochta@yandex.ru"
            className="profile__input"
          />
        </div>
        <button type="submit" className="profile__button">
          Редактировать
        </button>
        <button type="reset" className="profile__button profile__button_red">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
