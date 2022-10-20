import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const Main = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/signup" children={<Signup />} />
        <Route path="/login" children={<Login />} />
      </Switch>
    </React.Fragment>
  );
};

export default Main;
