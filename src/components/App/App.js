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

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(true);

  function openNavigation() {
    setIsNavigationOpen(true);
  }

  function closeNavigation() {
    setIsNavigationOpen(false);
  }

  function onRegister(data) {
    setIsLoading(true);

    return mainApi
      .register(data)
      .then(() => {
        setIsLoading(false);
        history.push("./signin");
      })
      .catch((err) => {
        setIsLoading(false);
        setRegisterErrorMessage(err.message);
      });
  }

  function onLogin(data) {
    setIsLoading(true);

    return mainApi
      .login(data)
      .then(() => {
        setIsLoading(false);
        history.push("./movies");
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "User is authorized");
      })
      .catch((err) => {
        setIsLoading(false);
        setLoginErrorMessage(err.message);
      });
  }

  function onLogout() {
    return mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("savedMoviesSearch");
        history.push("./");
      })
      .catch((err) => {
        console.log(
          "???????????? ?????? ?????????????? ???????????? ???? ?????????????? ????????????????",
          err.message
        );
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);

    return mainApi
      .updateUserInfo(data)
      .then((user) => {
        setIsLoading(false);
        setCurrentUser(user);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(
          "???????????? ?????? ?????????????? ???????????????? ???????????? ????????????????????????",
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
          console.log("???????????? ?????? ?????????????? ?????????????????? ??????????.", err.message);
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
        console.log("???????????? ?????? ?????????????? ?????????????? ??????????.", err.message);
      });
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      history.push("./");
    } else {
      history.push("./movies");
      setIsLoading(true);

      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userData, movies]) => {
          setIsLoading(false);
          setCurrentUser(userData);
          setLoggedIn(true);
          setSavedMovies(movies);
        })
        .catch((err) => {
          if (err.message === "???????????? 401") {
            console.log("???????????????????? ???????????? ??????????????????????");
          } else {
            setIsLoadingSuccess(false);
            console.log(
              "???????????? ?????? ???????????????? ???????????? ???????????????????????? ?? ?????????????????????? ??????????????",
              err.message
            );
          }
        });
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          location={location.pathname}
          onMenuClick={openNavigation}
          onLogoClick={onLogout}
        />

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
            isLoading={isLoading}
            isLoadingSuccess={isLoadingSuccess}
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
            isLoading={isLoading}
            onLogout={onLogout}
          />
          <Route exact path="/signup">
            <Register
              onSubmit={onRegister}
              isLoading={isLoading}
              errorMessage={registerErrorMessage}
            />
          </Route>
          <Route exact path="/signin">
            <Login
              onSubmit={onLogin}
              isLoading={isLoading}
              errorMessage={loginErrorMessage}
            />
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
