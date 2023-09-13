import DehazeIcon from "@mui/icons-material/Dehaze";
import AddIcon from "@mui/icons-material/Add";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import DraftsIcon from "@mui/icons-material/Drafts";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import BusinessIcon from "@mui/icons-material/Business";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import {
  isRoleManager,
  isRolePurchasingManager,
  isRoleWarehouseOperator,
} from "../../../services/role-auth";
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
            height: "55px",
            position: "fixed",
            zIndex: "999",
            width: props.open ? "249px" : "79px",
            marginTop: "-18px",
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

        {(isRolePurchasingManager() || isRoleManager()) && (
          <SubMenu label="Ordem de compra" icon={<DraftsIcon />}>
            <MenuItem
              component={<Link to="/purchaseOrder/registration" />}
              active={isActivePage("/purchaseOrder/registration")}
              prefix="Cadastrar"
              icon={<AddIcon />}
            />
            <MenuItem
              component={<Link to="/purchaseOrder/attachment" />}
              active={isActivePage("/purchaseOrder/attachment")}
              prefix="Anexos"
              icon={<AttachFileIcon />}
            />
          </SubMenu>
        )}

        {(isRoleWarehouseOperator() || isRoleManager()) && (
          <SubMenu label="Movimentação" icon={<SyncAltIcon />}>
            <MenuItem
              component={<Link to="/moviments/entry" />}
              active={isActivePage("/moviments/entry")}
              prefix="Entrada"
              icon={<TurnRightIcon />}
            />
            <MenuItem
              component={<Link to="/moviments/exit" />}
              active={isActivePage("/moviments/exit")}
              prefix="Saída"
              icon={<TurnLeftIcon />}
            />
          </SubMenu>
        )}

        <SubMenu label="Atalhos" icon={<ShortcutIcon />}>
          <MenuItem
            component={<Link to="/products" />}
            active={isActivePage("/products")}
            prefix="Produtos"
            icon={<StorefrontIcon />}
          />
          <MenuItem
            component={<Link to="/manufacturers" />}
            active={isActivePage("/manufacturers")}
            prefix="Fabricantes"
            icon={<BusinessIcon />}
          />
          <MenuItem
            component={<Link to="/suppliers" />}
            active={isActivePage("/suppliers")}
            prefix="Fornecedores"
            icon={<LocalShippingIcon />}
          />
        </SubMenu>
      </Menu>
    </div>
  );
}

export default SidebarItens;
