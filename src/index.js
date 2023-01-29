import './index.css';
import SetRoutes from './routes'

import React from "react";
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <SetRoutes />
  </React.StrictMode>,
  rootElement
);