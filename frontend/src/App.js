import logo from './logo.svg';
import React, { useEffect, userEffect, useState } from 'react';
import Cookies from'js-cookie';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/header';

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MoviesPage from "./pages/Movies";
import SlotsPage from "./pages/Timings";


function App() {
  const [user, setUser] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [exists, setExists] = useState(false);

  useEffect(async () => {
    if(window.location.pathname.length > 1) return;

    const token = Cookies.get("token");
    if (!token) {
      setFetched(true);
      return;
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}auth/`,
      {
        headers: new Headers({
          Authorization: token,
        }),
    });
    const { exists } = await res.json();
    setUser(token);
    setFetched(true);
    setExists(exists);
    console.log({resp : await res.body});
  });

  useEffect(() => {
    if(!fetched)
    return;

    if(user === false)
    {
      if(exists)
      window.location.pathname = "/login"
      else
      window.location.pathname = "/register"
    }
  }, [fetched])

  return (
    <Router>
      <Header user={false}></Header>
      <Switch>
        <Route path="/login" component={LoginPage}/>
         <Route path="/register" component={RegisterPage}/>
        <Route path="/movies" component={MoviesPage}/>
        <Route path="/timings" component={SlotsPage}/>
      </Switch>
    </Router>
  );
}

export default App;
