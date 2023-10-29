/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router, Routes } from "@solidjs/router";

import "./index.css";
import App from "./App";
import HourCalculator from "./apps/attendance/hour-calculator";

const root = document.getElementById("root");

// 一旦ベタ書きでベースパス問題を回避
// 今後ビルド時にコマンドに渡す or 環境変数等利用する形に変更する
const basePath = "/";

render(
  () => (
    <Router>
      <Routes>
        <Route path={basePath}>
          <Route path="/" component={App} />
          <Route path="/pallet">
            <Route path="/calculator" component={App}></Route>
          </Route>
          <Route path="/attendance">
            <Route path="/hour-calculator" component={HourCalculator} />
          </Route>
        </Route>
      </Routes>
    </Router>
  ),
  root!
);
