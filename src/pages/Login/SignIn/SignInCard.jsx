import logo from "../../../assets/DispoLogo.png"

import { useState } from "react"
import { Box, Link } from "@mui/material"
import { Navigate } from "react-router-dom"
import { Grid } from "../../../components/Basic/Grid/DefaultGrid"
import { DefaultBox } from "../../../components/Basic/Box/DefaultBox"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton"
import { SkipLine } from "../../../components/Basic/SkipLine/styles"
import { DefaultTextField, PasswordTextField } from "../../../components/Basic/TextField/TextField"
import { DefaultTypography } from "../../../components/Basic/Labels/Typography"
import { handleSignIn } from "../../../services/Login/signin"
import { setUserInfo } from "../../../services/Getters/lsUserInfoService"
import { setToken } from "../../../services/Getters/lsTokenService"
import { COLORS } from "../../../config/defaultColors"
import { sleep } from "../../../utils/nomear"

import "./style.css"
import "../../../services/apiMap"

export default function SignInCard() {

  const [emailRequest, setEmailRequest] = useState("");
  const [passwordRequest, setpasswordRequest] = useState("");
  const [goToHomePage, setgoToHomePage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (goToHomePage){
    return <Navigate to="/Home" />
  }

  const SignIn = () => {

    var data = {
      email: emailRequest,
      password: passwordRequest,
    }

    handleSignIn(data)
    .then(async function(res){

      setToken(res.data.data.tokenResponseDto.token);
      setUserInfo(res.data.data.userAccountResponseDto);
      setSuccessMessage("Logado com sucesso. Entrando...");
      setErrorMessage(null);
      await sleep(2500);
      setgoToHomePage(true);
    })
    .catch(function(err)
    {
      if (err.response.status == 404) {
        setErrorMessage(err.response.data.message);
        setSuccessMessage(null);
      }else{
        setErrorMessage("Erro inesperado");
        setSuccessMessage(null);
        console.log(err);
      }
    })
  }

  const keyPress = (e) => {
    if (e.key === 'Enter'){
      SignIn();
    }
  }

  return (
    <Grid backgroundColor={COLORS.SecondColor}>
      <DefaultBox width="400px" height="600px" marginLeft="0%" marginTop="0%">
        <div id="content">
          <Box sx={{ marginLeft: "-15px" }}>
            <img src={logo} alt="Dispo" width="250" height="220" style={{ marginLeft: "10%", marginTop: "-10%" }} />
            { 
              errorMessage 
              ?
              <div style={{ marginTop: "-15%", marginBottom: "10%", textAlign: "center", color: "red" }}>
                <label>{errorMessage}</label>
              </div>
              :
              successMessage
              ?
              <div style={{ marginTop: "-15%", marginBottom: "10%", textAlign: "center", color: "green" }}>
                <label>{successMessage}</label>
              </div>
              :
              null
            }
            <DefaultTextField label="E-mail" variant="outlined" type="email"
                              onChange={(value) => setEmailRequest(value.target.value) } onKeyPress={(e) => keyPress(e)} />
          </Box>
          <Box sx={{ marginLeft: "-15px" }}>
            <SkipLine paddingTop="40" />
            <PasswordTextField label="Senha" variant="outlined" type="password" 
                               onChange={(value) => setpasswordRequest(value.target.value) } onKeyPress={(e) => keyPress(e)} />
          </Box>
          <Box>
            <Link href="/login/forgotmypassword" underline="none"
                  style={{ color: COLORS.PrimaryColor, float: "right", marginBottom: 30, marginTop: 10 }}>
            Esqueci minha senha
            </Link>
          </Box>
          <Box textAlign="center">
            <DefaultButton onClick={SignIn} backgroundColor={COLORS.PrimaryColor} title="Login" width="250px" height="50px" />
          </Box>
          <DefaultTypography variant="h6" color={COLORS.PrimaryColor} textAlign="center" text="OU" paddingTop="15px"
                             paddingBottom="15px" />
          <Box textAlign="center">
            <DefaultButton href="/login/signup" backgroundColor={COLORS.PrimaryColor} title="Registrar" width="250px" height="50px" />
          </Box>
        </div>
      </DefaultBox>
    </Grid>
  );
}