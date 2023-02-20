import { useState } from "react"

import { Box } from "@mui/material"
import { Navigate } from "react-router-dom"
import { DefaultBox } from "../../../components/Basic/Box/DefaultBox"
import { Grid } from "../../../components/Basic/Grid/DefaultGrid"
import { DefaultTypography } from "../../../components/Basic/Labels/Typography"
import { SkipLine } from "../../../components/Basic/SkipLine/styles"
import { DefaultTextField } from "../../../components/Basic/TextField/TextField"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton"
import { handleSendResetPasswordCodeEmail } from "../../../services/Login/forgotmypassword"
import { getAccountIdByEmail } from "../../../services/Getters/account"
import { COLORS } from "../../../config/defaultColors"
import { setLocalStorage } from "../../../Storage/local"

export default function ForgotMyPasswordCard() {

  const [emailRequest, setEmailRequest] = useState("");
  const [goToResetPassword, setGoToResetPassword] = useState(false);
  const [accountId, setAccountId] = useState("");

  if (goToResetPassword && accountId !== ""){
    var urlWithAccountId = "/login/emailCodeResetPassword/accountId=" + accountId;  // Validar a possibilidade de melhorar isso   
    return <Navigate to={urlWithAccountId} />
  }
  
  const SendResetPasswordCodeEmail = () => {

    setLocalStorage("emailInputed", emailRequest);
    handleSendResetPasswordCodeEmail(emailRequest);
    setGoToResetPassword(true);
    getAccountIdByEmail(emailRequest).then(res => setAccountId(res.data.data)).catch(err => console.log(err));
  }
    
  return (
    <Grid backgroundColor={COLORS.SecondColor}>
      <DefaultBox width="950px" height="500px">
        <SkipLine paddingTop="40" />
        <DefaultTypography variant="h3" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35" text="Redefina sua senha" />
        <DefaultTypography variant="h6" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35"
          text="Informe seu Email e vamos enviar um código de 6 dígitos para que você possa refazer sua senha." />
        <Box textAlign="center">
          <SkipLine paddingTop="80" />
          <DefaultTextField label="Informe seu Email" variant="outlined" type="email" placeholder="name@example.com"
            width="600px" onChange={(value)=> setEmailRequest(value.target.value)} />
        </Box>
        <Box textAlign="center">
          <SkipLine paddingTop="100" />
          <DefaultButton onClick={SendResetPasswordCodeEmail} backgroundColor={COLORS.PrimaryColor} title="Enviar Código" />
        </Box>
      </DefaultBox>
    </Grid>
  );
}