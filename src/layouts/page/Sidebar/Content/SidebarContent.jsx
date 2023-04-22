import { Sidebar } from 'react-pro-sidebar';

import { SidebarItens } from "./Itens";
import { COLORS } from "../../../../themes/colors";

import "./styles.css"

function SidebarContent(props) {

  return (
      <div>
          <Sidebar width="260px" className="sidebar-content" backgroundColor={COLORS.SecondColor} style={{ marginTop: props.open ? "80px" : "45px" }}>
              <SidebarItens />
          </Sidebar>
      </div>
  );
}

export default SidebarContent;