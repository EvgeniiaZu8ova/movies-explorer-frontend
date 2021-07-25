import React from "react";

import "./App.css";

import { Route, Switch, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";

function App(props) {
  const location = useLocation();

  return (
    <div className="page">
      <Header location={location.pathname} />

      <Switch>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
