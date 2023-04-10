import React, { useState } from 'react';
import { IconButton, Menu, Avatar, MenuItem } from "@mui/material"
import { ProfileModal } from "../../Structured/Modal/ModalDialog"

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { removeCookie } from "../../../Storage/cookies"
import { removeLocalStorage } from "../../../Storage/local"

import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarItem,
} from 'mdb-react-ui-kit';

export default function Header(props) {

  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setProfileOptionsPosition] = useState(null);
  const open = Boolean(anchorEl)

  const onLogout = () => {

    removeCookie("emailSignin", "/");
    removeCookie("passwordSignin", "/");

    removeLocalStorage('accessToken'); 
    removeLocalStorage('accessUserInfo');
  }

  const openProfile = () => {
    setShowModal(true);
    setProfileOptionsPosition(null);
  }

  return (
    <div>
      <MDBNavbar expand='lg' light style={{ backgroundColor: "#ffff", boxShadow: "0px 0px 1px #2A2C35" }}>
        <MDBContainer fluid>
          <MDBNavbarBrand style={{ height: "40px" }}>
          <MDBNavbarItem style={{ marginTop: "-41px", marginLeft: "1375px" }}>
                <div>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={(e) => setProfileOptionsPosition(e.currentTarget)}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={() => setProfileOptionsPosition(null)}
                  onClick={() => setProfileOptionsPosition(null)}
                  PaperProps={{ sx: { '& .MuiAvatar-root': { width: 32, height: 32, mr: 1,},} }}
                >
                  <MenuItem onClick={openProfile}>
                    <Avatar />
                    My account
                  </MenuItem>
                    <Divider />
                  <MenuItem href="/config">
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                      Settings
                  </MenuItem>
                  <MenuItem component="a" href="/login/signin" onClick={onLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                <ProfileModal open={showModal} href="/profile" onClose={()=> setShowModal(false)}/>
            </div>
              </MDBNavbarItem>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
