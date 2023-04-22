import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as Material from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ReactRoundedImage from "react-rounded-image";
import { VscChromeClose } from "react-icons/vsc";

import TextField from "../../ui/textfields/form/TextField"
import { DefaultButton } from "../../ui/buttons/Default/DefaultButton"
import { COLORS } from "../../../themes/colors"
import { getLocalStorage } from "../../../data/storage/browser/local"

import avatar from "../../../assets/img/avatares/avatar.png"
import { ProfileModalStyle, ModalDefaultStyle, CloseButton } from "./styles"
import "./styles.css";

function Modal(props) {

  return (
    <div>
      <Material.Modal
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={ModalDefaultStyle}>
          <div className="modal-header">
            <div className="modal-title">
              <Typography variant="h6" text={props.title} color={COLORS.SecondColor} />
            </div>
            <div className="modal-close-button">
              <IconButton sx={CloseButton} onClick={props.onClose}>
                <VscChromeClose />
              </IconButton>
            </div>
          </div>
          <div>
            { props.children }
          </div>
        </Box>
      </Material.Modal>
    </div>
  );
}

function ProfileModal(props) {

  const userInfo = JSON.parse(getLocalStorage("accessUserInfo"));

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ProfileModalStyle}>
          <div> {/* Header */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Profile
            </Typography>
          </div>
          <div className="modal-body">
            <div> {/* Content */}
              <Box marginLeft="28%" paddingBottom={5} paddingTop={5}>
                <ReactRoundedImage image={avatar} roundedColor={COLORS.ThirdColor} imageWidth="130" imageHeight="130"/>
              </Box>
              <Box textAlign="center">
                <Box paddingBottom={2} paddingTop={-2}>
                  <TextField label="Name" width="300px" disabled="true" value={`${userInfo.firstName} ${userInfo.lastName}`} />
                </Box>
                <Box paddingBottom={2} paddingTop={2}>
                  <TextField label="Email" width="300px" disabled="true" value={userInfo.email ?? ''} />
                </Box>
                <Box paddingBottom={5} paddingTop={2}>
                  <TextField label="CpfCnpj" width="300px" disabled="true" value={userInfo.cpfCnpj ?? ''} />
                </Box>
              </Box>
            </div>
          </div>
          <div> {/* Footer */}
            <Box textAlign="center">
              <DefaultButton title="Close" backgroundColor={COLORS.PrimaryColor} onClick={props.onClose} width="100px" height="40px" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <DefaultButton title="Edit" backgroundColor={COLORS.PrimaryColor} href={props.href} width="100px" height="40px" />
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { Modal, ProfileModal }