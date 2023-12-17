import RoutesConfiguration from "./routes/Routes";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import styled from "styled-components";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-alert";
import { useState } from "react";

import {
  NotificacaoOptions,
  NotificacaoTemplate,
} from "./components/structured/alert/notification/Notification";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const Button = styled.div`
    position: fixed;
    width: 100%;
    left: 90%;
    bottom: 10%;
    height: 20px;
    font-size: 3rem;
    z-index: 999;
    cursor: pointer;
    color: #029dbe;
  `;

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <ArrowCircleUpIcon
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none", fontSize: "60px" }}
      />
    </Button>
  );
}

function App() {
  return (
    <ProSidebarProvider>
      <Provider template={NotificacaoTemplate} {...NotificacaoOptions}>
        <RoutesConfiguration />
        <ScrollButton />
      </Provider>
    </ProSidebarProvider>
  );
}

export default App;
