import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StylesProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./i18n";
import { RecoilRoot } from "recoil";

const application = (
  <Suspense fallback="loading">
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <StylesProvider injectFirst>
            <App />
          </StylesProvider>
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
  </Suspense>
);

ReactDOM.render(application, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
