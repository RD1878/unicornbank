import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StylesProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { RecoilRoot } from "recoil";
import { PrimaryLoader } from "./atoms";

const application = (
  <Suspense fallback={<PrimaryLoader />}>
    <RecoilRoot>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>
);

ReactDOM.render(application, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
