import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { Application } from "client/core/Application";
import "semantic-ui-css/semantic.min.css";

const container = document.getElementById("app");

const HotApplication = hot(Application, {
  errorBoundary: false,
});

ReactDOM.hydrate(<HotApplication />, container);
