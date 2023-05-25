import { Sidebar } from "react-pro-sidebar";

import SidebarItens from "./Itens";
import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function SidebarContent(props) {
  return (
    <Sidebar
      width="260px"
      className="sidebar"
      backgroundColor={COLORS.SecondColor}
    >
      <SidebarItens open={props.open} onToggleNav={props.onToggleNav} />
      <div className="sidebar-content"></div>
    </Sidebar>
  );
}

export default SidebarContent;
