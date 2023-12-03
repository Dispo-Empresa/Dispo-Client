import React from "react";
import ReactDOM from "react-dom";

import App from './App'

import "primereact/resources/themes/tailwind-light/theme.css";
//import "primereact/resources/themes/fluent-light/theme.css";
//import "primereact/resources/themes/lara-light-blue/theme.css";
//import "primereact/resources/themes/saga-blue/theme.css";
import "./index.css";
import "./components/structured/datatable/styles.css";
import "./components/ui/inputs/select/styles.css";
import "./components/ui/inputs/radio/styles.css";
import "./components/ui/inputs/currency/styles.css";
import "./components/structured/stepper/styles.css";
import "./components/ui/inputs/date/styles.css";
import "./pages/movimentation/styles.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);