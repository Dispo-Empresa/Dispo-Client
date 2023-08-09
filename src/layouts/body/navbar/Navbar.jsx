import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { IconButton, Menu, Avatar, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import { removeToken } from "../../../services/authToken";

import "./styles.css";
import useFields from "./useFields";
import { post } from "../../../services/httpMethods";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

function Navbar() {
  const [selectedWarehouse, changeSelectedWarehouse] = useState({
    value: -1,
    label: "",
  });

  const handleChangeWarehouse = async (e) => {
    await post(
      ENDPOINTS.userAccount.changeWarehouse,
      parseInt(e.getAttribute("data-value"))
    );
    removeToken();
  };

  const setCurrentWarehouse = (warehouses) => {
    if (warehouses.length <= 0 || selectedWarehouse.value != -1) return;
    let current = warehouses.find((warehouse) => {
      if (warehouse.current) {
        return warehouse;
      }
    });

    changeSelectedWarehouse({
      value: current.value,
      label: current.label,
    });
  };

  const [anchorEl, setProfileOptionsPosition] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElTest, setAnchor] = useState(null);
  const openTest = Boolean(anchorElTest);

  const onLogout = () => {
    removeToken();
  };

  const [warehouses] = useFields();
  setCurrentWarehouse(warehouses);

  return (
    <MDBNavbar className="container-navbar" fixed="top" bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand></MDBNavbarBrand>
        <MDBInputGroup className="d-flex w-auto mb-3 aateste">
          <IconButton
            component={Link}
            to="/configuracoes"
            style={{ borderRadius: "0%" }}
          >
            <Avatar
              sx={{ width: 30, height: 30, backgroundColor: "transparent" }}
            >
              <SettingsIcon sx={{ width: 28, height: 28, color: "#2C3745" }} />
            </Avatar>
          </IconButton>
          <IconButton
            onClick={(e) => setProfileOptionsPosition(e.currentTarget)}
          >
            <Avatar sx={{ width: 28, height: 28, bgcolor: "#2C3745" }}>
              <label style={{ fontSize: "15px" }}>M</label>
            </Avatar>
          </IconButton>
          <Menu
            disableScrollLock={true}
            anchorEl={anchorEl}
            open={open}
            onClose={() => setProfileOptionsPosition(null)}
            onClick={() => setProfileOptionsPosition(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem component={Link} to="/profile">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <b>Matheus</b>
            </MenuItem>
            <MenuItem component="a" href="/login/signin" onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon style={{ color: "#F63644" }} />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
          <button
            type="button"
            className="classic-button"
            style={{
              fontSize: "15px",
              color: "#2C3745",
              backgroundColor: "transparent",
            }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            {selectedWarehouse.label}
            <ArrowDropDownIcon />
          </button>
          <Menu
            disableScrollLock={true}
            anchorEl={anchorElTest}
            open={openTest}
            onClose={() => setAnchor(null)}
            onClick={() => setAnchor(null)}
          >
            <MenuItem component="a" href="/warehouses">
              Acesso aos depósitos
            </MenuItem>
            <Divider component="li" />
            {warehouses.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                name={option.label}
                selected={option}
                data-value={option.value}
                component="a"
                href="/login/signin"
                onClick={(e) => handleChangeWarehouse(e.currentTarget)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
