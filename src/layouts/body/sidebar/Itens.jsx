import DehazeIcon from "@mui/icons-material/Dehaze";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import DraftsIcon from "@mui/icons-material/Drafts";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import BusinessIcon from "@mui/icons-material/Business";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InventoryIcon from "@mui/icons-material/Inventory";
import GridViewIcon from "@mui/icons-material/GridView";
import { useEffect, useState } from "react";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { getSessionStorage, setSessionStorage } from "data/session";
import {
  isRoleManager,
  isRolePurchasingManager,
  isRoleWarehouseOperator,
} from "services/role-auth";
import { COLORS } from "themes/colors";

import "./styles.css";

function SidebarItens(props) {
  const [menuStates, setMenuStates] = useState({});

  const isActivePage = (path) => {
    return window.location.pathname === path;
  };

  useEffect(() => {
    const menuStatesJSON = getSessionStorage("menuStates");
    if (menuStatesJSON) {
      const parsedMenuStates = JSON.parse(menuStatesJSON);
      setMenuStates(parsedMenuStates);
    }
  }, []);

  const onMenuOpen = (path) => {
    const updatedMenuStates = { ...menuStates };

    if (path in updatedMenuStates) {
      updatedMenuStates[path] =
        updatedMenuStates[path] === "path-open" ? "path-closed" : "path-open";
    } else {
      updatedMenuStates[path] = "path-open";
    }

    setMenuStates(updatedMenuStates);

    const menuStatesJSON = JSON.stringify(updatedMenuStates);
    setSessionStorage("menuStates", menuStatesJSON);
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
          <SubMenu
            label="Ordem de compra"
            icon={<DraftsIcon />}
            open={menuStates["purchase-order"] === "path-open"}
            onOpenChange={() => {
              onMenuOpen("purchase-order");
            }}
          >
            <MenuItem
              component={<Link to="/ordem-de-compra/cadastrar" />}
              active={isActivePage("/ordem-de-compra/cadastrar")}
              prefix="Cadastrar"
              icon={<AddIcon />}
            />
            <MenuItem
              component={<Link to="/ordem-de-compra/anexos" />}
              active={isActivePage("/ordem-de-compra/anexos")}
              prefix="Anexos"
              icon={<AttachFileIcon />}
            />
          </SubMenu>
        )}

        {(isRoleWarehouseOperator() || isRoleManager()) && (
          <SubMenu
            label="Depósito"
            icon={<InventoryIcon />}
            open={menuStates["warehouse"] === "path-open"}
            onOpenChange={() => {
              onMenuOpen("warehouse");
            }}
          >
            <MenuItem
              component={<Link to="/warehouse" />}
              active={isActivePage("/warehouse")}
              prefix="Visão geral"
              icon={<GridViewIcon />}
            />
            <MenuItem
              component={<Link to="/movimentacoes" />}
              active={isActivePage("/movimentacoes")}
              prefix="Movimentações"
              icon={<SyncAltIcon />}
            />
          </SubMenu>
        )}

        <SubMenu
          label="Atalhos"
          icon={<ShortcutIcon />}
          open={menuStates["shortcuts"] === "path-open"}
          onOpenChange={() => {
            onMenuOpen("shortcuts");
          }}
        >
          <MenuItem
            component={<Link to="/produtos" />}
            active={isActivePage("/produtos")}
            prefix="Produtos"
            icon={<StorefrontIcon />}
          />
          <MenuItem
            component={<Link to="/fabricantes" />}
            active={isActivePage("/fabricantes")}
            prefix="Fabricantes"
            icon={<BusinessIcon />}
          />
          <MenuItem
            component={<Link to="/fornecedores" />}
            active={isActivePage("/fornecedores")}
            prefix="Fornecedores"
            icon={<LocalShippingIcon />}
          />
        </SubMenu>
      </Menu>
    </div>
  );
}

export default SidebarItens;
