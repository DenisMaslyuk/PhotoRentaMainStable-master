import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header";
import Index from "./components/index";
import Single from "./components/single";
import New from "./components/new";
import Edit from "./components/edit";
import profile from "./components/profile";
import login from "./components/login";
import register from "./components/register";
import About from './components/About';
import Catalog  from './components/Catalog';
import Conditions  from './components/Conditions';


const App = () => (
  <Router>
    <div>
      <Header/>
      <Route path="/" exact component={Index} />
      <Route path="/new" exact component={New} />
      <Route path="/product/:id" exact component={Single} />
      <Route path="/edit/:id" exact component={Edit} />
      <Route path="/profile" exact component={profile} />
      <Route path="/login" exact component={login} />
      <Route path="/register" exact component={register} />
      <Route path="/catalog" exact component={Catalog} />
      <Route path="/conditions" exact component={Conditions} />
      <Route path="/about" exact component={About} />
      
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));
