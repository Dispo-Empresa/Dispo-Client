import SetRoutes from './routes'
import React from "react";
import ReactDOM from "react-dom";

import { NotificationProvider } from "./components/Structured/Notifications/MessageNotification/NotificationProvider"

import './index.css';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <SetRoutes />
    </NotificationProvider>
  </React.StrictMode>,
  rootElement
);