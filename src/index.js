import App from './App'
import React from "react";
import ReactDOM from "react-dom";

import { NotificationProvider } from "./components/Structured/Notifications/MessageNotification/NotificationProvider"
import { ProSidebarProvider } from 'react-pro-sidebar';

import './index.css';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ProSidebarProvider>
  </React.StrictMode>,
  rootElement
);