import React from "react";
import ReactDOM from "react-dom";

import App from './App'

import "primereact/resources/themes/tailwind-light/theme.css";
//import "primereact/resources/themes/fluent-light/theme.css";
//import "primereact/resources/themes/lara-light-blue/theme.css";
//import "primereact/resources/themes/saga-blue/theme.css";
import './index.css';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />  
  </React.StrictMode>,
  rootElement
);