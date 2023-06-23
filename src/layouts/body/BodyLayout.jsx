import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useState } from "react";

import Sidebar from "./sidebar/SidebarContent";
import Navbar from "./navbar/Navbar";
import { Footer } from "./footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function BodyLayout(props) {
  const { collapseSidebar } = useProSidebar();
  const [open, setOpen] = useState(true);

  const onToggleNav = () => {
    setOpen(!open);
    collapseSidebar();
  };

  return (
    <div className="body-container">
      <Sidebar open={open} onToggleNav={onToggleNav} />
      <Navbar />
      <div className="main">
        {props.children}
        <Footer />
      </div>
    </div>
  );
}

export default BodyLayout;
