/* @refresh reload */
import { render } from "solid-js/web";
import { Link, Route, Router, Routes } from "@solidjs/router";

import "./index.css";
import App from "./App";
import HourCalculator from "./apps/attendance/hour-calculator";
import { ParentProps } from "solid-js";
import { Box, Typography } from "@suid/material";
import PalletCalculator from "./apps/pallet/calculator";

const root = document.getElementById("root");

// 一旦ベタ書きでベースパス問題を回避
// 今後ビルド時にコマンドに渡す or 環境変数等利用する形に変更する
const basePath = "/";

function AppRoot() {
  return (
    <Routes>
      <Route path={basePath}>
        <Route path="/" component={App} />
        <Route path="/pallet">
          <Route path="/calculator" component={PalletCalculator}></Route>
        </Route>
        <Route path="/attendance">
          <Route path="/hour-calculator" component={HourCalculator} />
        </Route>
      </Route>
    </Routes>
  );
}

type LayoutProps = {} & ParentProps;
function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <Box>
        <Typography>Header</Typography>
        <Link href="/pallet/calculator">パレット数計算</Link>
        <Link href="/attendance/hour-calculator">稼働時間計算</Link>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

render(
  () => (
    <Router>
      <Layout>
        <AppRoot />
      </Layout>
    </Router>
  ),
  root!
);
