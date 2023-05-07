import RoutesConfiguration from "./routes/Routes";
import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-alert";

import {
  NotificacaoOptions,
  NotificacaoTemplate,
} from "./components/structured/alert/notification/Notification";

function App() {
  return (
    <ProSidebarProvider>
      <Provider template={NotificacaoTemplate} {...NotificacaoOptions}>
        <RoutesConfiguration />;
      </Provider>
    </ProSidebarProvider>
  );
}

export default App;
