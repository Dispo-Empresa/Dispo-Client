import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { Box, Link } from "@mui/material";
import { Navigate } from "react-router-dom";

import TextField from "../../../components/ui/textfields/form/TextField";
import Button from "../../../components/ui/buttons/classic/Button";
import useKeyPress from "../../../hooks/useKeyPress";
import { setToken } from "../../../services/api/authToken";
import { COLORS } from "../../../themes/colors";
import { encryptData, decryptData } from "../../../data/security/cryptClient";
import { getCookie, setCookie } from "../../../data/storage/browser/cookies";
import { post } from "../../../services/api/crud";

import logo from "../../../assets/img/logo/DispoLogo.png";

import "./style.css";

function SignIn() {
  const [emailRequest, setEmailRequest] = useState("matheustexte123@gmail.com");
  const [passwordRequest, setpasswordRequest] = useState("debora14");
  const [goToHomePage, setgoToHomePage] = useState(false);
  const [loading, setLoading] = useState("");
  const [keepConnected, setKeepConnected] = useState(false);
  useKeyPress("Enter", handleKeyPress);

  useEffect(() => {
    const emailSigninCookie = getCookie("emailSignin");
    const passwordSigninCookie = getCookie("passwordSignin");

    if (emailSigninCookie && passwordSigninCookie) {
      SignIn();
    }
  }, []);

  if (goToHomePage) {
    return <Navigate to="/dashboard" />;
  }

  const SignIn = async () => {
    const emailSigninCookie = decryptData(getCookie("emailSignin"));
    const passwordSigninCookie = decryptData(getCookie("passwordSignin"));

    var data = {
      email: emailRequest,
      password: passwordRequest,
    };

    try {
      setLoading("Carregando...");
      var response = await post("Auth/signin", data);

      console.log(response);

      if (keepConnected && !emailSigninCookie && !passwordSigninCookie) {
        setCookie("emailSignin", encryptData(emailRequest), "/");
        setCookie("passwordSignin", encryptData(passwordRequest), "/");
      }

      setToken(response.data.tokenResponseDto.token);
      setgoToHomePage(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading("Erro na tentativa de login");
      //if (err.response.status == 404) {
      //  setErrorMessage(err.response.data.message);
      //  setSuccessMessage(null);
      //} else if (err.code == "ERR_NETWORK") {
      //  setErrorMessage("Serviço não encontrado ou fora do ar");
      //  setSuccessMessage(null);
      //} else {
      //  setErrorMessage("Erro inesperado");
      //  setSuccessMessage(null);
      //  console.log(err);
      //}
    }
  };

  function handleKeyPress() {
    SignIn();
  }

  return (
    <Box
      sx={{
        width: "400px",
        height: "600px",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div id="content">
        <Box sx={{ marginLeft: "-15px" }}>
          <Box>
            <img
              src={logo}
              alt="Dispo"
              width="250"
              style={{ marginLeft: "10%", marginBottom: "20%" }}
            />
          </Box>
          {loading && <div>Carregando...</div>}
          <Box>
            <TextField
              label="E-mail"
              variant="outlined"
              type="email"
              value={emailRequest}
              onChange={(value) => setEmailRequest(value.target.value)}
            />
          </Box>
          <Box sx={{ marginTop: "10%" }}>
            <TextField
              label="Senha"
              variant="outlined"
              type="password"
              value={passwordRequest}
              onChange={(value) => setpasswordRequest(value.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ marginLeft: "-5%", marginTop: "5%" }}>
          <FormControlLabel
            control={
              <Checkbox
                label="Mantenha-me conectado"
                onChange={() => setKeepConnected(!keepConnected)}
                value={keepConnected}
              />
            }
            label="Mantenha-me conectado"
          />
        </Box>
        <Box textAlign="center" sx={{ marginTop: "20%" }}>
          <Button
            onClick={SignIn}
            backgroundColor={COLORS.PrimaryColor}
            title="Login"
            width="250px"
            height="50px"
          />
        </Box>
        <Box textAlign="center" sx={{ marginTop: "5%" }}>
          <Link href="/login/forgotmypassword" underline="none">
            Esqueci minha senha
          </Link>
        </Box>
      </div>
    </Box>
  );
}

export default SignIn;
