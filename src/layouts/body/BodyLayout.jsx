import { useEffect } from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useState } from "react";

import Sidebar from "./sidebar/SidebarContent";
import Navbar from "./navbar/Navbar";
import Navigator from "./Navigator";
import { Footer } from "./footer/Footer";
import { getLocalStorage, setLocalStorage } from "data/local";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function BodyLayout(props) {
  const { collapseSidebar } = useProSidebar();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    var sidebarState = getLocalStorage("sidebar-state");

    if (sidebarState != null) {
      var isOpen = sidebarState === "sidebar-open" ? true : false;

      setLocalStorage("sidebar-state", sidebarState);
      setOpen(isOpen);
      collapseSidebar(!isOpen);
    }
  }, [collapseSidebar]);

  const onToggleNav = () => {
    var sidebarState = getLocalStorage("sidebar-state");

    if (sidebarState != null) {
      var isOpen = sidebarState === "sidebar-open" ? true : false;

      var state =
        sidebarState === "sidebar-open" ? "sidebar-closed" : "sidebar-open";

      setLocalStorage("sidebar-state", state);
      setOpen(!isOpen);
      collapseSidebar(isOpen);
    } else {
      var state = open ? "sidebar-closed" : "sidebar-open";

      setLocalStorage("sidebar-state", state);
      setOpen(!open);
      collapseSidebar(open);
    }
  };

  return (
    <div className="body-container">
      <Sidebar open={open} onToggleNav={onToggleNav} />
      <Navbar />
      <div className="main">
        {!props.hideNavigator && <Navigator />}
        {props.children}
        <Footer />
      </div>
    </div>
  );
}

export default BodyLayout;
