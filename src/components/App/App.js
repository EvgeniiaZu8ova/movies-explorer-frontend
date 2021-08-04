import { React, useState, useEffect } from "react";

import { useHistory } from "react-router";

import { Route, Switch, useLocation } from "react-router-dom";

import "./App.css";

import mainApi from "../../utils/MainApi";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import UnknownPage from "../UnknownPage/UnknownPage";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

function App() {
  const location = useLocation();
  const history = useHistory();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const openNavigation = () => setIsNavigationOpen(true);
  const closeNavigation = () => setIsNavigationOpen(false);

  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  function onRegister(data) {
    return mainApi
      .register(data)
      .then(() => {
        history.push("./signin");
      })
      .catch((err) => {
        setRegisterErrorMessage(err.message);
      });
  }

  function onLogin(data) {
    return mainApi
      .login(data)
      .then(() => {
        history.push("./movies");
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoginErrorMessage(err.message);
      });
  }

  function onLogout() {
    return mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        history.push("./");
      })
      .catch((err) => {
        console.log(
          "Ошибка при попытке выхода из лчиного кабинета",
          err.message
        );
      });
  }

  function handleUpdateUser(data) {
    return mainApi
      .updateUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(
          "Ошибка при попытке обновить данные пользователя",
          err.message,
          data
        );
      });
  }

  useEffect(() => {
    if (loggedIn) {
      history.push("./movies");
    }
  }, [loggedIn, history]);

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err.message === "Ошибка 401") {
          history.push("./");
          console.log("Необходимо пройти авторизацию");
        } else {
          console.log("Ошибка при загрузке данных пользователя", err.message);
        }
      });
  }, [history, loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header location={location.pathname} onMenuClick={openNavigation} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route exact path="/profile">
            <Profile onUpdate={handleUpdateUser} onLogout={onLogout} />
          </Route>
          <Route exact path="/signup">
            <Register
              onSubmit={onRegister}
              errorMessage={registerErrorMessage}
            />
          </Route>
          <Route exact path="/signin">
            <Login onSubmit={onLogin} errorMessage={loginErrorMessage} />
          </Route>
          <Route path="*">
            <UnknownPage />
          </Route>
        </Switch>

        <Footer location={location.pathname} />

        <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
