import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { styled } from "@mui/material/styles";

import { MoreButton } from "components/ui/buttons/icons/IconButton";

function DropdownButtons() {
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreButton onClick={handleClick} />
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} disableRipple>
          Nada
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Aqui
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Por
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Enquanto
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default DropdownButtons;
