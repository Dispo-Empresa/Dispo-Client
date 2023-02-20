import logo from "../../../assets/DispoLogo.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState, useEffect } from "react"
import { Box, Link } from "@mui/material"
import { Navigate } from "react-router-dom"
import { Grid } from "../../../components/Basic/Grid/DefaultGrid"
import { DefaultBox } from "../../../components/Basic/Box/DefaultBox"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton"
import { DefaultTextField, PasswordTextField } from "../../../components/Basic/TextField/TextField"
import { handleSignIn } from "../../../services/Login/signin"
import { setUserInfo } from "../../../services/Getters/lsUserInfoService"
import { setToken } from "../../../services/Getters/lsTokenService"
import { COLORS } from "../../../config/defaultColors"
import { sleep } from "../../../utils/helperFunctions"
import { encryptData, decryptData } from "../../../security/cryptClient"
import { getCookie, setCookie } from "../../../Storage/cookies"

import "./style.css"
import "../../../services/apiMap"

export default function SignInCard() {

  const [emailRequest, setEmailRequest] = useState("");
  const [passwordRequest, setpasswordRequest] = useState("");
  const [goToHomePage, setgoToHomePage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);

  useEffect(() => {

    const emailSigninCookie = getCookie("emailSignin");
    const passwordSigninCookie = getCookie("passwordSignin");

    if(emailSigninCookie && passwordSigninCookie){
      SignIn();
    }

  }, []);

  if (goToHomePage){
    return <Navigate to="/Home" />
  }

  const SignIn = () => {

    const emailSigninCookie = decryptData(getCookie("emailSignin"));
    const passwordSigninCookie = decryptData(getCookie("passwordSignin"));

    if(emailSigninCookie && passwordSigninCookie){
      setEmailRequest(emailSigninCookie);
      setpasswordRequest(passwordSigninCookie);
    }

    var data = {
      
      email: emailSigninCookie ? emailSigninCookie : emailRequest,
      password: passwordSigninCookie ? passwordSigninCookie: passwordRequest,
      
      email: emailSigninCookie ? emailSigninCookie : emailRequest,
      password: passwordSigninCookie ? passwordSigninCookie: passwordRequest,
    }

    handleSignIn(data)
    .then(async function(res){

      if(keepConnected && (!emailSigninCookie && !passwordSigninCookie)){
        setCookie("emailSignin", encryptData(emailRequest), "/");
        setCookie("passwordSignin", encryptData(passwordRequest), "/");
      }

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
      }else if(err.code == "ERR_NETWORK"){
        setErrorMessage("Serviço não encontrado ou fora do ar");
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
  };

  return (
    <Grid backgroundColor={COLORS.SecondColor}>
      <DefaultBox width="400px" height="600px" marginLeft="0%" marginTop="0%">
        <div id="content">
          <Box sx={{ marginLeft: "-15px" }}>
            <Box>
              <img src={logo} alt="Dispo" width="250" height="220" style={{ marginLeft: "10%", marginTop: "-5%" }} />
            </Box>
            <Box>
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
            </Box>
            <Box>
              <DefaultTextField label="E-mail" variant="outlined" type="email"
                                onChange={(value) => setEmailRequest(value.target.value) } onKeyPress={(e) => keyPress(e)} />
            </Box>
            <Box sx={{ marginTop: "10%" }}>
              <PasswordTextField label="Senha" variant="outlined" type="password" 
                                 onChange={(value) => setpasswordRequest(value.target.value) } onKeyPress={(e) => keyPress(e)} />
            </Box>
          </Box>
          <Box sx={{ marginLeft: "-5%", marginTop: "5%" }}>
            <FormControlLabel control={<Checkbox label="Mantenha-me conectado" onChange={() => setKeepConnected(!keepConnected)} value={keepConnected} />} label="Mantenha-me conectado" />
          </Box>
          <Box textAlign="center" sx={{ marginTop: "20%" }}>
            <DefaultButton onClick={SignIn} backgroundColor={COLORS.PrimaryColor} title="Login" width="250px" height="50px" />
          </Box>
          <Box textAlign="center" sx={{ marginTop: "5%" }}>
            <Link href="/login/forgotmypassword" underline="none">Esqueci minha senha</Link>
          </Box>
        </div>
      </DefaultBox>
    </Grid>
  );
}