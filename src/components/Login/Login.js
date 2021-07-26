import React from "react";

import UserEntryForm from "../UserEntryForm/UserEntryForm";

function Login(props) {
  return (
    <UserEntryForm
      title="Рады видеть!"
      isPathSignUp={false}
      buttonTitle="Войти"
      question="Ещё не зарегистрированы?"
      linkText="Регистрация"
    />
  );
}

export default Login;
