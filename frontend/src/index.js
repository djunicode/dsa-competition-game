<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
>>>>>>> 3fa81085fa7a921e46251921985d79f3acd9e1aa

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
<<<<<<< HEAD
  document.getElementById("root")
=======
  document.getElementById('root'),
>>>>>>> 3fa81085fa7a921e46251921985d79f3acd9e1aa
);
