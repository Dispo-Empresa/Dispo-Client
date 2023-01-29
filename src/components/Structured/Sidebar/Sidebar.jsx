import classnames from "classnames";
import Header from "../Header/Header";
import * as FaIcons from "react-icons/fa";

import { useState } from "react";
import { SubMenu } from "../../Structured/Submenu/Submenu";
import { SidebarData, SidebarDataCollapsed } from "../../Structured/Submenu/sidebarData";
import { COLORS } from "../../../config/defaultColors";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap"
import { Footer } from "../Footer/Footer"
import { DefaultTypography } from "../../Basic/Labels/Typography"
import { Box } from "@mui/system";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"

export default function Sidebar(props) {
  const [open, setOpen] = useState(true);
  const mobile = window.matchMedia("(max-width: 768px)").matches;

  const onToggleNav = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div className="navHeaderWrap" style={{ backgroundColor: COLORS.PrimaryColor }}>
        <Header />
      </div>
        <div className="bodyWrap">
        <div className={classnames("sidenav", { sidenavOpen: open }, { sidenavClose: !open })} style={{ backgroundColor: COLORS.SecondColor }}>
          {
            open
            ?
            <div style={{ color: "#F1F2F7", marginLeft: "80%", marginTop: "-20%", fontSize: "25px" }}>
            <span onClick={onToggleNav}>
              <FaIcons.FaBars />
            </span>
          </div>
          :
          <div style={{ color: "#F1F2F7", marginLeft: "30%", marginTop: "-10%", fontSize: "25px" }}>
           <span onClick={onToggleNav}>
             <FaIcons.FaBars />
           </span>
		    </div>
          }
        <div style={{ marginTop: "50px" }}>
          { open 
            ?
            SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })
            :
            SidebarDataCollapsed.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })
          }
        </div>
        </div>
        <div className={classnames("main", { mainShrink: open }, { mainExpand: !open }, { noscroll: mobile && open })}>
          <Box paddingBottom={3} paddingTop={2} style={{ marginLeft: props.contentMarginLeft }}>
            <DefaultTypography variant="h3" text={props.contentTitle} />
          </Box>
          {props.children}
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}