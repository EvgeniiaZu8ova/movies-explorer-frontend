import { React, useState, useEffect } from "react";

import { useHistory } from "react-router";

import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import "./App.css";

import mainApi from "../../utils/MainApi";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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

  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);

  const openNavigation = () => setIsNavigationOpen(true);
  const closeNavigation = () => setIsNavigationOpen(false);

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

  function handleSaveMovie(movieName) {
    const storageFilms = JSON.parse(localStorage.getItem("savedMoviesSearch"));
    const myMovie =
      storageFilms && storageFilms.find((el) => el.nameRU === movieName);

    if (myMovie) {
      return mainApi
        .createMovie(myMovie)
        .then((data) => {
          setSavedMovies([...savedMovies, data]);
        })
        .catch((err) => {
          console.log("Ошибка при попытке сохранить фильм.", err.message);
        });
    }
  }

  function handleDeleteMovie(movieName) {
    const myMovie = savedMovies.find((el) => el.nameRU === movieName);

    return mainApi
      .deleteMovie(myMovie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((el) => el._id !== myMovie._id));
      })
      .catch((err) => {
        console.log("Ошибка при попытке удалить фильм.", err.message);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      history.push("./movies");
    } else {
      history.push("./");
    }
  }, [loggedIn, history]);

  useEffect(() => {
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
      .then(([userData, movies]) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setSavedMovies(movies);
      })
      .catch((err) => {
        if (err.message === "Ошибка 401") {
          console.log("Необходимо пройти авторизацию");
        } else {
          console.log(
            "Ошибка при загрузке данных пользователя и сохранённых фильмов",
            err.message
          );
        }
      });
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header location={location.pathname} onMenuClick={openNavigation} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            myMovies={savedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={savedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
          />
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdate={handleUpdateUser}
            onLogout={onLogout}
          />
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
          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
        </Switch>

        <Footer location={location.pathname} />

        <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
