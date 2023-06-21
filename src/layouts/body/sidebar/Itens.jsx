import DehazeIcon from "@mui/icons-material/Dehaze";
import AddIcon from "@mui/icons-material/Add";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { COLORS } from "../../../themes/colors";

import "./styles.css";

function SidebarItens(props) {
  const isActivePage = (path) => {
    return window.location.pathname === path;
  };

  return (
    <div>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0 || level === 1) {
              return {
                backgroundColor: active ? "#029DBE" : "#161C23",
                height: "55px",
                fontSize: "14px",
                fontFamily: "Open Sans,sans-serif",
                fontWeight: "bold",
                color: COLORS.DetailsColor,
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "#0E1217",
                  color: COLORS.DetailsColor,
                },
              };
            }
          },
        }}
      >
        <MenuItem
          icon={<DehazeIcon />}
          onClick={props.onToggleNav}
          style={{
            backgroundColor: "#0E1217",
            height: "60px",
            position: "fixed",
            zIndex: "999",
            width: props.open ? "259px" : "79px",
            marginTop: "-19px",
            transition: "width,left,right,300ms",
          }}
        />
        <MenuItem
          component={<Link to="/dashboard" />}
          active={isActivePage("/dashboard")}
          prefix="Dashboard"
          icon={<DashboardIcon />}
          style={{ marginTop: "66px" }}
        />

        <SubMenu label="Estoque" icon={<WarehouseIcon />}>
          <MenuItem
            component={<Link to="/stock/moviments" />}
            active={isActivePage("/stock/moviments")}
            prefix="Teste Multi Step"
            icon={<SyncAltIcon />}
          />
          <MenuItem
            component={<Link to="/stock/moveProduct" />}
            active={isActivePage("/stock/moveProduct")}
            prefix="Movimentar Produto"
            icon={<SyncAltIcon />}
          />
        </SubMenu>

        <SubMenu label="Cadastros" icon={<AddIcon />}>
          <MenuItem
            component={<Link to="/products/registration" />}
            active={isActivePage("/products/registration")}
            prefix="Produtos"
            icon={<StorefrontIcon />}
          />
          <MenuItem
            component={<Link to="/providers/registration" />}
            active={isActivePage("/providers/registration")}
            prefix="Fornecedores"
            icon={<LocalShippingIcon />}
          />
        </SubMenu>
      </Menu>
    </div>
  );
}

export default SidebarItens;
