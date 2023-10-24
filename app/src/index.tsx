/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router, Routes } from "@solidjs/router";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/pallet">
          <Route path="/calculator" component={App}></Route>
        </Route>
        <Route path="/attendance">
          <Route path="/hour-calculator" component={App} />
        </Route>
      </Routes>
    </Router>
  ),
  root!
);
