import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from "./lib/core/Application";
import "semantic-ui-css/semantic.min.css";

const container = document.getElementById("app");

ReactDOM.hydrate(<Application />, container);
