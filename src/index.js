import React from "react";
import ReactDOM from "react-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';

import App from './App'
import { NotificationProvider } from "./components/structured/alert/notification/NotificationProvider"

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