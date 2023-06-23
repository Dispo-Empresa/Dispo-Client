import { Sidebar } from "react-pro-sidebar";

import SidebarItens from "./Itens";
import { COLORS } from "../../../themes/colors";

import "./styles.css";

function SidebarContent(props) {
  return (
    <Sidebar width="260px" className="sidebar" backgroundColor="#161C23">
      <SidebarItens open={props.open} onToggleNav={props.onToggleNav} />
      <div className="sidebar-content"></div>
    </Sidebar>
  );
}

export default SidebarContent;
