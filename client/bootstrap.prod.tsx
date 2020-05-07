import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from "./lib/core/Application";

const container = document.getElementById("app");

ReactDOM.hydrate(<Application />, container);
