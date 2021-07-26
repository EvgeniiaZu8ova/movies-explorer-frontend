import React from "react";

import UserEntryForm from "../UserEntryForm/UserEntryForm";

function Register(props) {
  return (
    <UserEntryForm
      title="Добро пожаловать!"
      isPathSignUp={true}
      buttonTitle="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
    />
  );
}

export default Register;
