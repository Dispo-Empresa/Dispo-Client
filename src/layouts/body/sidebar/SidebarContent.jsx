import { Sidebar } from "react-pro-sidebar";

import SidebarItens from "./Itens";

import "./styles.css";

function SidebarContent(props) {
  return (
    <Sidebar width="250px" className="sidebar" backgroundColor="#161C23">
      <SidebarItens open={props.open} onToggleNav={props.onToggleNav} />
      <div className="sidebar-content"></div>
    </Sidebar>
  );
}

export default SidebarContent;
