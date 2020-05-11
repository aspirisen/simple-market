import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "client/routes/Login";
import { Signup } from "client/routes/Signup";

export const Routes = React.memo(() => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      <Redirect to="/dashboard" />
    </Switch>
  );
});
