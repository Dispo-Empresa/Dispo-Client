import React from 'react';
import classnames from "classnames";
import { useProSidebar } from 'react-pro-sidebar';
import { useState } from "react";

import SidebarHeader from "./Sidebar/Header/SidebarHeader";
import SidebarContent from "./Sidebar/Content/SidebarContent";
import SidebarFooter from "./Sidebar/Footer/SidebarFooter"
import Navbar from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import { COLORS } from "../../themes/colors";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function MainLayout(props) {
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
                <Navbar />
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

export default MainLayout;