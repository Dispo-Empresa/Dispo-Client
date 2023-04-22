import { useState } from "react"
import { Box } from "@mui/material"
import { Navigate } from "react-router-dom"
import { Grid } from "@mui/material"
import { Typography } from "@mui/material"

import TextField from "../../../components/ui/textfields/form/TextField"
import { DefaultButton } from "../../../components/ui/buttons/Default/DefaultButton"
import { COLORS } from "../../../themes/colors"
import { setLocalStorage } from "../../../data/storage/browser/local"

export default function ForgotPassword() {

    //const [emailRequest, setEmailRequest] = useState("");
    //const [goToResetPassword, setGoToResetPassword] = useState(false);
    //const [accountId, setAccountId] = useState("");
  //
    //if (goToResetPassword && accountId !== ""){
    //  var urlWithAccountId = "/login/emailCodeResetPassword/accountId=" + accountId;  // Validar a possibilidade de melhorar isso   
    //  return <Navigate to={urlWithAccountId} />
    //}
    //
    //const SendResetPasswordCodeEmail = () => {
    //
    //  setLocalStorage("emailInputed", emailRequest);
    //  setGoToResetPassword(true);
    //}
    //  
    //return (
    //  <Grid backgroundColor={COLORS.SecondColor}>
    //    <Box sx={{ width: "950px", height: "500px" }}>
    //      <Typography variant="h3" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35" text="Redefina sua senha" />
    //      <Typography variant="h6" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35"
    //        text="Informe seu Email e vamos enviar um código de 6 dígitos para que você possa refazer sua senha." />
    //      <Box textAlign="center">
    //        <TextField label="Informe seu Email" variant="outlined" type="email" placeholder="name@example.com"
    //                   width="600px" onChange={(value)=> setEmailRequest(value.target.value)} />
    //      </Box>
    //      <Box textAlign="center">
    //        <DefaultButton onClick={SendResetPasswordCodeEmail} backgroundColor={COLORS.PrimaryColor} title="Enviar Código" />
    //      </Box>
    //    </Box>
    //  </Grid>
    //);
}