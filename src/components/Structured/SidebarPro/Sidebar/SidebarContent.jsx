import { Sidebar } from 'react-pro-sidebar';
import { SidebarItens } from "./Itens";
import { COLORS } from '../../../../config/defaultColors';

import "./styles.css"

export default function SidebarContent(props) {

  return (
    <div className="sidebar-content">
      <Sidebar width="260px" backgroundColor={COLORS.SecondColor} style={{ marginTop: props.open ? "80px" : "35px" }}>
        <SidebarItens />
      </Sidebar>
    </div>
  );
}