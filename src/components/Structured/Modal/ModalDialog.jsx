import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactRoundedImage from "react-rounded-image";
import avatar from "../../../assets/avatar.png"
import IconButton from '@mui/material/IconButton';

import { DefaultButton } from "../../Basic/Button/Default/DefaultButton"
import { DefaultTextField } from "../../Basic/TextField/TextField"
import { ProfileModalStyle, ModalDefaultStyle, CloseButton } from "./styles"
import { COLORS } from "../../../config/defaultColors"
import { getLocalStorage } from "../../../Storage/local"
import { DefaultTypography } from "../../../components/Basic/Labels/Typography"
import { VscChromeClose } from "react-icons/vsc";

import "./styles.css";

export function DefaultModal(props) {

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={ModalDefaultStyle}>
          <div className="modal-header">
            <div className="modal-title">
              <DefaultTypography variant="h6" text={props.title} color={COLORS.SecondColor} />
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
      </Modal>
    </div>
  );
}

export function ProfileModal(props) {

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
                  <DefaultTextField label="Name" width="300px" disabled="true" value={`${userInfo.firstName} ${userInfo.lastName}`} />
                </Box>
                <Box paddingBottom={2} paddingTop={2}>
                  <DefaultTextField label="Email" width="300px" disabled="true" value={userInfo.email ?? ''} />
                </Box>
                <Box paddingBottom={5} paddingTop={2}>
                  <DefaultTextField label="CpfCnpj" width="300px" disabled="true" value={userInfo.cpfCnpj ?? ''} />
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