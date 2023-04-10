import React from 'react';
import classnames from "classnames";
import Header from "../../Header/Header";
import SidebarHeader from "../../SidebarPro/Header/SidebarHeader"
import SidebarContent from "../../SidebarPro/Sidebar/SidebarContent";
import SidebarFooter from "../../SidebarPro/Footer/SidebarFooter"

import { useProSidebar } from 'react-pro-sidebar';
import { useState } from "react";
import { COLORS } from "../../../../config/defaultColors";
import { Footer } from "../../Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function MainClient(props) {
  const { collapseSidebar } = useProSidebar();
  const [open, setOpen] = useState(true);
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  
  const onToggleNav = () => {
    setOpen(!open);
    collapseSidebar();
  } 

  return ( 
    <div>
      <div>
        <Header />
      </div>
      <div className="bodyWrap">
        <div className={classnames("sidenav", { sidenavOpen: open }, { sidenavClose: !open })} style={{ backgroundColor: COLORS.SecondColor }}>
          <SidebarHeader open={open} onToggleNav={onToggleNav} />
          <SidebarContent open={open} />
          <SidebarFooter open={open} />
        </div>
        <div className={classnames("main", { mainShrink: open }, { mainExpand: !open }, { noscroll: mobile && open })}>
          {props.children}
          <Footer />
        </div>
      </div>
    </div>
  );
}