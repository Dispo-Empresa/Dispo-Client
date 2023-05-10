import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { VscChromeClose } from "react-icons/vsc";

import { COLORS } from "../../../themes/colors";
import {
  ModalDefaultStyle,
  CloseButton,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from "./styles.js";

function ModalDialog(props) {
  return (
    <div>
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={ModalDefaultStyle}>
          <Box sx={ModalHeader}>
            <Box sx={ModalTitle}>
              <Typography
                variant="h6"
                color={COLORS.SecondColor}
                style={{ fontWeight: "bold" }}
              >
                {props.title}
              </Typography>
            </Box>
            <Box sx={ModalCloseButton}>
              <IconButton sx={CloseButton} onClick={props.onClose}>
                <VscChromeClose />
              </IconButton>
            </Box>
          </Box>
          <div>{props.children}</div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalDialog;
