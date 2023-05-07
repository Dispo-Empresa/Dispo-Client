import * as CiIcons from "react-icons/ci";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { removeCookie } from "../../../../data/storage/browser/cookies";
import { removeLocalStorage } from "../../../../data/storage/browser/local";
import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function SidebarFooter() {
  const onLogout = () => {
    removeCookie("emailSignin", "/");
    removeCookie("passwordSignin", "/");

    removeLocalStorage("accessToken");
  };

  return (
    <Menu
      menuItemStyles={{
        button: () => {
          return {
            backgroundColor: COLORS.SecondColor,
            height: "55px",
            fontSize: "14px",
            fontFamily: "Open Sans,sans-serif",
            color: COLORS.DetailsColor,
            "&:hover": {
              backgroundColor: COLORS.PrimaryColor,
              color: COLORS.DetailsColor,
            },
          };
        },
      }}
    >
      <MenuItem
        className="menu-item"
        component={<Link to="/login/signin" />}
        onClick={onLogout}
        prefix="Sair"
        icon={<CiIcons.CiLogout style={{ fontSize: "25px" }} />}
      />
    </Menu>
  );
}

export default SidebarFooter;
