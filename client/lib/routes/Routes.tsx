import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Cart } from "./Cart";
import { Login } from "./Login";
import { Orders } from "./Orders";
import { Products } from "./Products";
import { Signup } from "./Signup";

export const Routes = React.memo(() => {
  return (
    <Switch>
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={Login} />
      <Route path="/orders" component={Orders} />
      <Route path="/products" component={Products} />
      <Route path="/signup" component={Signup} />

      <Redirect to="/products" />
    </Switch>
  );
});
