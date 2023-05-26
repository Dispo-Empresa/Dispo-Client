import * as GrIcons from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import * as FaIcons from "react-icons/fa";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { removeCookie } from "../../../../data/storage/browser/cookies";
import { removeLocalStorage } from "../../../../data/storage/browser/local";
import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function SidebarItens(props) {
  const isActivePage = (path) => {
    return window.location.pathname === path;
  };

  const onLogout = () => {
    removeCookie("emailSignin", "/");
    removeCookie("passwordSignin", "/");

    removeLocalStorage("accessToken");
  };

  return (
    <div>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0 || level === 1) {
              return {
                backgroundColor: active
                  ? COLORS.PrimaryColor
                  : COLORS.SecondColor,
                height: "55px",
                fontSize: "14px",
                fontFamily: "Open Sans,sans-serif",
                fontWeight: "bold",
                color: COLORS.DetailsColor,
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: COLORS.PrimaryColor,
                  color: COLORS.DetailsColor,
                },
              };
            }
          },
        }}
      >
        <MenuItem
          icon={<FaIcons.FaBars className="toggler" size={25} />}
          onClick={props.onToggleNav}
          style={{
            backgroundColor: "#08317D",
            height: "60px",
            position: "fixed",
            zIndex: "999",
            width: props.open ? "259px" : "79px",
            marginTop: "-19px",
            transition: "width,left,right,300ms",
            "&:hover": {
              backgroundColor: COLORS.PrimaryColor,
              color: COLORS.DetailsColor,
            },
          }}
        />
        <MenuItem
          component={<Link to="/dashboard" />}
          active={isActivePage("/dashboard")}
          prefix="Dashboard"
          icon={<GrIcons.GrProjects className="icon" size={20} />}
          style={{ marginTop: "66px" }}
        />

        <SubMenu
          label="Estoque"
          icon={<GrIcons.GrUpdate className="icon" size={20} />}
        >
          <MenuItem
            component={<Link to="/stock/moviments" />}
            active={isActivePage("/stock/moviments")}
            prefix="Movimentações"
            icon={<GrIcons.GrCubes className="icon" size={20} />}
          />
        </SubMenu>

        <SubMenu
          label="Produtos"
          icon={<GrIcons.GrBasket className="icon" size={20} />}
        >
          <MenuItem
            component={<Link to="/products/registration" />}
            active={isActivePage("/products/registration")}
            prefix="Cadastrar"
            icon={<GrIcons.GrAdd className="icon" size={20} />}
          />
          <MenuItem
            component={<Link to="/products/visualization" />}
            active={isActivePage("/products/visualization")}
            prefix="Consultar"
            icon={<GrIcons.GrView className="icon" size={20} />}
          />
        </SubMenu>

        <SubMenu
          label="Marcas"
          icon={<GrIcons.GrTag className="icon" size={20} />}
        >
          <MenuItem
            component={<Link to="/brands/registration" />}
            active={isActivePage("/brands/registration")}
            prefix="Cadastrar"
            icon={<GrIcons.GrAdd className="icon" size={20} />}
          />
          <MenuItem
            component={<Link to="/brands/visualization" />}
            active={isActivePage("/brands/visualization")}
            prefix="Consultar"
            icon={<GrIcons.GrView className="icon" size={20} />}
          />
        </SubMenu>

        <SubMenu
          label="Fornecedores"
          icon={<GrIcons.GrBus className="icon" size={20} />}
        >
          <MenuItem
            component={<Link to="/providers/registration" />}
            active={isActivePage("/providers/registration")}
            prefix="Cadastrar"
            icon={<GrIcons.GrAdd className="icon" size={20} />}
          />
          <MenuItem
            component={<Link to="/providers/visualization" />}
            active={isActivePage("/providers/visualization")}
            prefix="Consultar"
            icon={<GrIcons.GrView className="icon" size={20} />}
          />
        </SubMenu>

        <SubMenu
          label="Configurações"
          icon={<GrIcons.GrPerformance className="icon" size={20} />}
        >
          <MenuItem
            component={<Link to="/Profile" />}
            active={isActivePage("/Profile")}
            prefix="Profile"
            icon={<GrIcons.GrUser className="icon" size={20} />}
          />
          <MenuItem
            component={<Link to="/adm" />}
            active={isActivePage("/adm")}
            prefix="ADM"
            icon={<GrIcons.GrUser className="icon" size={20} />}
          />
          <MenuItem
            className="menu-item"
            component={<Link to="/login/signin" />}
            onClick={onLogout}
            prefix="Sair"
            icon={<CiLogout style={{ fontSize: "25px" }} />}
          />
        </SubMenu>
      </Menu>
    </div>
  );
}

export default SidebarItens;
