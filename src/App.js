import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Create from "./components/post/Create";
import Posts from "./components/post/Posts";
import Edit from "./components/post/Edit";
import Category from './components/category/Category';

export default function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/post" exact component={Posts} />
      </Switch>
      <Switch>
        <Route path="/post/create" exact component={Create} />
      </Switch>
      <Switch>
        <Route path="/post/:id/edit" exact component={Edit} />
      </Switch>
      <Switch>
        <Route path="/category" exact component={Category} />
      </Switch>
      <Footer />
    </Router>
  );
}
