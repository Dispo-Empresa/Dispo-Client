import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";
import { IconButton, Menu, Avatar, MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { removeToken } from "../../../services/api/authToken";
import { COLORS } from "../../../themes/colors";

import "./styles.css";

function Navbar() {
  const [anchorEl, setProfileOptionsPosition] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElTest, setAnchor] = useState(null);
  const openTest = Boolean(anchorElTest);

  const onLogout = () => {
    removeToken();
  };

  const options = ["Depósito 1", "Depósito 2", "Depósito 3", "Depósito 4"];

  return (
    <MDBNavbar className="container-navbar" fixed="top" bgColor="light">
      <MDBContainer>
        <MDBNavbarBrand />
        <MDBNavbarBrand
          style={{
            marginTop: "-8px",
          }}
        >
          <IconButton component={Link} to="/configuracoes">
            <Avatar
              sx={{ width: 30, height: 30, backgroundColor: "transparent" }}
            >
              <SettingsIcon
                sx={{ width: 32, height: 32, color: "#161C23" }}
              ></SettingsIcon>
            </Avatar>
          </IconButton>
          <IconButton
            onClick={(e) => setProfileOptionsPosition(e.currentTarget)}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "#161C23" }}>
              M
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
            <Divider component="li" />
            <MenuItem component="a" href="/login/signin" onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon style={{ color: "#F63644" }} />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
          <Button
            style={{ fontSize: "13px", marginTop: "3px", color: "#161C23" }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            Depósito 1
            <ArrowDropDownIcon />
          </Button>
          <Menu
            disableScrollLock={true}
            anchorEl={anchorElTest}
            open={openTest}
            onClose={() => setAnchor(null)}
            onClick={() => setAnchor(null)}
          >
            <MenuItem>
              <label style={{ color: COLORS.PrimaryColor }}>
                Acesso aos depósitos
              </label>
            </MenuItem>
            <Divider component="li" />
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Depósito 1"}
                onClick={() => setAnchor(null)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </MDBNavbarBrand>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;
