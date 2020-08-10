// import "../public/index.css";

import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import * as Sentry from "@sentry/browser";
import { config } from "dotenv";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

config();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (process.env.REACT_APP_NODE_ENV !== "development")
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_API,
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
