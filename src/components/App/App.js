import { React, useState } from "react";

import "./App.css";

import { Route, Switch, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import UnknownPage from "../UnknownPage/UnknownPage";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

function App(props) {
  const location = useLocation();

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const openNavigation = () => setIsNavigationOpen(true);
  const closeNavigation = () => setIsNavigationOpen(false);

  return (
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
          <Movies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <UnknownPage />
        </Route>
      </Switch>

      <Footer location={location.pathname} />

      <Navigation isOpen={isNavigationOpen} onClose={closeNavigation} />
    </div>
  );
}

export default App;
