import { Sidebar } from "react-pro-sidebar";

import SidebarHeader from "../header/SidebarHeader";
import SidebarItens from "./Itens";
import SidebarFooter from "../footer/SidebarFooter";
import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function SidebarContent(props) {
  return (
    <Sidebar
      width="260px"
      className="sidebar"
      backgroundColor={COLORS.SecondColor}
    >
      <SidebarHeader onToggleNav={props.onToggleNav} />
      <div className="sidebar-content">
        <SidebarItens />
      </div>
      <div className="sidebar--footer">
        <SidebarFooter />
      </div>
    </Sidebar>
  );
}

export default SidebarContent;
