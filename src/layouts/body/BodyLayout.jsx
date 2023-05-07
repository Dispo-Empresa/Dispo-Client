import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useState } from "react";

import Sidebar from "./sidebar/content/SidebarContent";
import Navbar from "./navbar/Navbar";
import { Footer } from "./footer/Footer";
import { COLORS } from "../../themes/colors";

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
    <div>
      <div>
        <Navbar />
      </div>
      <div className="body-container">
        <div style={{ backgroundColor: COLORS.SecondColor }}>
          <Sidebar open={open} onToggleNav={onToggleNav} />
        </div>
        <div className="main">
          {props.children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default BodyLayout;
