import { Sidebar } from 'react-pro-sidebar';
import { SidebarItensFooter } from "../Sidebar/Itens";
import { COLORS } from '../../../../config/defaultColors';

import "./styles.css"

export default function SidebarFooter(props) {
    return (
      <div>
        <Sidebar width="260px" className="sidebar-footer" backgroundColor={COLORS.SecondColor} style={{ marginTop: props.open ? "40px" : "35px" }}>
          <SidebarItensFooter />
        </Sidebar>
      </div>
    );
}