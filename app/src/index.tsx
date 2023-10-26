/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router, Routes } from "@solidjs/router";

import "./index.css";
import App from "./App";
import HourCalculator from "./apps/attendance/hour-calculator";

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
          <Route path="/hour-calculator" component={HourCalculator} />
        </Route>
      </Routes>
    </Router>
  ),
  root!
);
