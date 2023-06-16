import { useState } from "react";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

import TextField from "../../../../components/ui/textfields/form/TextField";
import Button from "../../../../components/ui/buttons/classic/Button";
import { COLORS } from "../../../../themes/colors";

function EmailCodeResetPassword() {
  //const [codeN1, setcodeN1] = useState("");
  //const [codeN2, setcodeN2] = useState("");
  //const [codeN3, setcodeN3] = useState("");
  //const [codeN4, setcodeN4] = useState("");
  //const [codeN5, setcodeN5] = useState("");
  //const [codeN6, setcodeN6] = useState("");
  //const [goToResetPassword, setgoToResetPassword] = useState(false);
  //const accountId = window.location.pathname.substring(40);
  //
  //if (goToResetPassword){
  //  var urlWithAccountId = "/login/resetPassword/" + accountId;
  //  return <Navigate to={urlWithAccountId} />
  //};
  //
  //const EmailCodeChecker = () => {
  //
  //    const request = {
  //      email: getLocalStorage("emailInputed"),
  //      inputedToken: codeN1 + codeN2 + codeN3 + codeN4 + codeN5 + codeN6
  //    };
  //}
  //
  //return (
  //    <Box style={{ width: "1000px", height: "500px" }}>
  //        <Box>
  //            <Typography variant="h3" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35" text="Código enviado!" />
  //        </Box>
  //        <Box>
  //            <Typography variant="h6" color={COLORS.PrimaryColor} textAlign="center" paddingTop="35"
  //                               text="Enviamos um código no Email informado anteriormente, este código tem validade de X minutos
  //                                     deve ser colocado nos campos abaixo para que você possa refazer sua senha." />
  //        </Box>
  //        <Box textAlign="center">
  //            <TextField variant="outlined" type="number" onChange={(e) => setcodeN1(e.target.value) }/>
  //            <TextField variant="outlined" type="number" onChange={(e) => setcodeN2(e.target.value) } />
  //            <TextField variant="outlined" type="number" onChange={(e) => setcodeN3(e.target.value) } />
  //            <TextField variant="outlined" type="number" onChange={(e) => setcodeN4(e.target.value) } />
  //            <TextField variant="outlined" type="number" onChange={(e) => setcodeN5(e.target.value) } />
  //            <TextField variant="outlined" type="number" onChange={(e) => setcodeN6(e.target.value) } />
  //        </Box>
  //        <Box textAlign="center">
  //            <DefaultButton title="Confirmar" onClick={EmailCodeChecker} backgroundColor={COLORS.PrimaryColor} />
  //        </Box>
  //    </Box>
  //);
}

export default EmailCodeResetPassword;
