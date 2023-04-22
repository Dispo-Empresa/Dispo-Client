import { Sidebar } from 'react-pro-sidebar';
import { SidebarItensFooter } from "../Content/Itens";
import { COLORS } from "../../../../themes/colors";

import "./styles.css"

function SidebarFooter(props) {
    return (
        <Sidebar width="260px" className="sidebar-footer" backgroundColor={COLORS.SecondColor} style={{ marginTop: props.open ? "40px" : "35px" }}>
            <SidebarItensFooter />
        </Sidebar>
    );
}

export default SidebarFooter;