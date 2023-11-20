import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { IconButton, Menu, Avatar, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import useFetch from "../../../hooks/useFetchApi";
import {
  removeToken,
  getUserName,
  getCurrentWarehouseName,
} from "../../../services/authToken";
import { post } from "../../../services/httpMethods";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

import "./styles.css";

function Navbar() {
  const { data: warehousesByAccount } = useFetch(
    ENDPOINTS.warehouses.getWithAdressByUser
  );
  const [anchorEl, setProfileOptionsPosition] = useState(null);
  const [anchorElTest, setAnchor] = useState(null);
  const open = Boolean(anchorEl);
  const openTest = Boolean(anchorElTest);

  const handleChangeWarehouse = async (e) => {
    await post(
      ENDPOINTS.accounts.changeWarehouse,
      parseInt(e.getAttribute("data-value"))
    );
    removeToken();
  };

  const onLogout = () => {
    removeToken();
  };

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
              <label style={{ fontSize: "15px" }}>
                {getUserName().charAt(0)}
              </label>
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
            <MenuItem component={Link} to="/perfil">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <b>{getUserName()}</b>
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
            {getCurrentWarehouseName()}
            <ArrowDropDownIcon />
          </button>
          <Menu
            disableScrollLock={true}
            anchorEl={anchorElTest}
            open={openTest}
            onClose={() => setAnchor(null)}
            onClick={() => setAnchor(null)}
          >
            <MenuItem component="a" href="/depositos">
              Acesso aos depósitos
            </MenuItem>
            <Divider component="li" />
            {warehousesByAccount &&
              warehousesByAccount.data.map((option) => (
                <MenuItem
                  key={option.warehouseId}
                  value={option.warehouseId}
                  name={option.name}
                  selected={option}
                  data-value={option.warehouseId}
                  component="a"
                  href="/login/signin"
                  onClick={(e) => handleChangeWarehouse(e.currentTarget)}
                >
                  {option.name}
                </MenuItem>
              ))}
          </Menu>
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
