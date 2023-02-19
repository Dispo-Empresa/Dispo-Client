import React, { useState } from 'react';
import { Collapse, Navbar, Nav } from "reactstrap"
import { IconButton, Menu, Avatar, MenuItem } from "@mui/material"
import { ProfileModal } from "../../Structured/Modal/ModalDialog"

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { removeCookie } from "../../../Storage/cookies"
import { removeLocalStorage } from "../../../Storage/local"

export default function Header() {

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
      <Navbar color="" light expand="md">
        <Collapse style={{position: "fixed", marginLeft: open || showModal ? "64.4%" : "65%"}} isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <div style={{ marginTop: "60%", marginLeft: "50%" }}>
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
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
