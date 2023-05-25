import * as FaIcons from "react-icons/fa";
import { Menu, MenuItem } from "react-pro-sidebar";

import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function SidebarHeader(props) {
  return (
    <div>
      <Menu
        menuItemStyles={{
          button: () => {
            return {
              backgroundColor: "#08317D",
              height: "60px",
              "&:hover": {
                backgroundColor: COLORS.PrimaryColor,
                color: COLORS.DetailsColor,
              },
            };
          },
        }}
      >
        <MenuItem
          icon={<FaIcons.FaBars className="toggler" />}
          onClick={props.onToggleNav}
        />
      </Menu>
    </div>
  );
}

export default SidebarHeader;
