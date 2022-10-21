import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import ExpensePage from "./ExpensePage";
const Main = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact children={<Signup />} />
        <Route path="/login" children={<Login />} />
        <Route path="/expense" children={<ExpensePage />} />
      </Switch>
    </React.Fragment>
  );
};

export default Main;
