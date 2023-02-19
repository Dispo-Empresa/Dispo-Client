import { useState } from 'react';

import { Box } from "@mui/material";
import { Navigate } from 'react-router-dom'; 
import { Grid } from "../../../../components/Basic/Grid/DefaultGrid"
import { DefaultBox } from "../../../../components/Basic/Box/DefaultBox"
import { DefaultTypography } from "../../../../components/Basic/Labels/Typography"
import { DefaultTextField } from "../../../../components/Basic/TextField/TextField"
import { SkipLine } from "../../../../components/Basic/SkipLine/styles"
import { DefaultButton } from "../../../../components/Basic/Button/Default/DefaultButton"
import { handleEmailCodeChecker } from "../../../../services/Login/coderesetpasswordcard"
import { COLORS } from "../../../../config/defaultColors"
import { getLocalStorage } from "../../../../Storage/local"

export default function CodeResetPasswordCard() {

  const [codeN1, setcodeN1] = useState("");
  const [codeN2, setcodeN2] = useState("");
  const [codeN3, setcodeN3] = useState("");
  const [codeN4, setcodeN4] = useState("");
  const [codeN5, setcodeN5] = useState("");
  const [codeN6, setcodeN6] = useState("");
  const [goToResetPassword, setgoToResetPassword] = useState(false);
  const accountId = window.location.pathname.substring(40);           // Melhorar //

  if (goToResetPassword){
    var urlWithAccountId = "/login/resetPassword/" + accountId;
    return <Navigate to={urlWithAccountId} />
  };

  const EmailCodeChecker = () => {

    const request = {
      email: getLocalStorage("emailInputed"),
      inputedToken: codeN1 + codeN2 + codeN3 + codeN4 + codeN5 + codeN6
    };

    handleEmailCodeChecker(JSON.stringify(request))
      .then(res => res.data.success ? setgoToResetPassword(true) : console.log(res.data.message))
      .catch(err => console.log(err));
  }
  
  return (
    <Grid backgroundColor={COLORS.SecondColor}>
      <DefaultBox width="1000px" height="500px">
        <Box>
          <SkipLine paddingTop="40" />
          <DefaultTypography variant="h3" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35" text="Código enviado!" />
        </Box>
        <Box>
          <SkipLine paddingTop="20" />
          <DefaultTypography variant="h6" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35" 
                             text="Enviamos um código no Email informado anteriormente, este código tem validade de X minutos 
                                   deve ser colocado nos campos abaixo para que você possa refazer sua senha." />
        </Box>
        <Box textAlign="center">
          <SkipLine paddingTop="50" />
          <DefaultTextField variant="outlined" type="number" inputProps={{ inputProps: { max: 9, min: 0 } }}
                            width="60px" height="50px" onChange={(e) => setcodeN1(e.target.value) }/>

          <DefaultTextField variant="outlined" type="number" inputProps={{ inputProps: { max: 9, min: 0 } }}
                            width="60px" height="50px" onChange={(e) => setcodeN2(e.target.value) } />

          <DefaultTextField variant="outlined" type="number" inputProps={{ inputProps: { max: 9, min: 0 } }}
                            width="60px" height="50px" onChange={(e) => setcodeN3(e.target.value) } />

          <DefaultTextField variant="outlined" type="number" inputProps={{ inputProps: { max: 9, min: 0 } }}
                            width="60px" height="50px" onChange={(e) => setcodeN4(e.target.value) } />

          <DefaultTextField variant="outlined" type="number" inputProps={{ inputProps: { max: 9, min: 0 } }}
                            width="60px" height="50px" onChange={(e) => setcodeN5(e.target.value) } />

          <DefaultTextField variant="outlined" type="number" inputProps={{ inputProps: { max: 9, min: 0 } }}
                            width="60px" height="50px" onChange={(e) => setcodeN6(e.target.value) } />
        </Box>
        <Box textAlign="center">
          <SkipLine paddingTop="80" />
          <DefaultButton onClick={EmailCodeChecker} backgroundColor={COLORS.PrimaryColor} title="Confirmar" />
        </Box>
      </DefaultBox>
    </Grid>
  );
}