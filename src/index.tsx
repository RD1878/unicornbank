import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StylesProvider } from "@material-ui/core";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4TK-zk8ewPHqkvEdvlW9t_0NVd1blcBY",
  authDomain: "unicorn-bank.firebaseapp.com",
  databaseURL: "https://unicorn-bank.firebaseio.com",
  projectId: "unicorn-bank",
  storageBucket: "unicorn-bank.appspot.com",
  messagingSenderId: "752395005755",
  appId: "1:752395005755:web:f95ca8474fcd61378d511e",
  measurementId: "G-B64R21CPGN",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <StylesProvider injectFirst>
    <App />
  </StylesProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
