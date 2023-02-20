import React, { useState } from 'react';
import InputMask from "react-input-mask"

import { DefaultTextField, PasswordTextField } from "../../../components/Basic/TextField/TextField"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton"
import { DefaultIconButton } from "../../../components/Basic/Icons/IconButton"
import { handleSignUp } from "../../../services/Login/signup"
import { BACKGROUNDS, COLORS } from "../../../config/defaultColors"
import { Box, Card, CardContent } from '@material-ui/core';
import { TextField } from '@mui/material';
import { cpfCnpjChange } from "../../../utils/helperFunctions"

import "../../../styles/registrationContent.css"

export default function SignUpCard() {

  const [cpfCnpjRequest, setCpfCnpjRequest] = useState("");
  const [passwordRequest, setPasswordRequest] = useState("");
  const [emailRequest, setEmailRequest] = useState("");
  const [firstNameRequest, setFirstNameRequest] = useState("");
  const [lastNameRequest, setLastNameRequest] = useState("");
  const [phoneRequest, setPhoneRequest] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => { setShowPassword(!showPassword) };

  const SignUp = () => {
    handleSignUp({
      Email: emailRequest,
      Password: passwordRequest,
      FirstName: firstNameRequest,
      LastName: lastNameRequest,
      CpfCnpj: cpfCnpjRequest,
      Phone: phoneRequest.replace(/\D/g,''),
      BranchId: 1
    })
  }

  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <div style={{ marginLeft: "13%", width: "1400px" }}>
        <Card style={{ border: "1px solid #e7ecf1", marginBottom: "2%", marginTop: "10%" }}>
          <CardContent>
            <div class="container">
              <div class="content">
                <form action="#">
                  <div class="user-details">
                    <div class="input-box">
                      <Box paddingTop={5}>
                        <DefaultTextField value={cpfCnpjRequest} variant="outlined" label="CPF/CNPJ" type="email"
                                          onChange={(value) => setCpfCnpjRequest(cpfCnpjChange(value)) } />
                      </Box>
                    </div>
                    <div class="input-box">
                      <Box paddingTop={5}>
                        <DefaultTextField label="E-mail" variant="outlined" type="email" 
                                          onChange={(value) => setEmailRequest(value.target.value) } />
                      </Box>
                    </div>
                    <div class="input-box">
                      <Box paddingTop={5}>
                        <PasswordTextField label="Senha" variant="outlined" type={showPassword ? "text" : "password" } 
                                           onChange={(value) => setPasswordRequest(value.target.value) } />
                        <DefaultIconButton onClick={handleClickShowPassword} showPassword={showPassword} />
                      </Box>
                    </div>
                    <div class="input-box">
                      <Box paddingTop={5}>
                        <DefaultTextField label="Nome" variant="outlined" type="text" 
                                          onChange={((value) => setFirstNameRequest(value.target.value)) } />
                      </Box>
                    </div>
                    <div class="input-box"> 
                      <Box paddingBottom={2}>
                        <DefaultTextField label="Sobrenome" variant="outlined" type="text" 
                                          onChange={(value) => setLastNameRequest(value.target.value)} />
                      </Box>
                    </div>
                    <div class="input-box">
                      <Box paddingBottom={2}>
                        <InputMask mask="+99 (99) 9 9999-9999" disabled={false} maskChar=" " 
                                   onChange={(value) => setPhoneRequest(value.target.value) }>
                          { () => <TextField label="Telefone" variant="outlined" type="text" /> }
                        </InputMask>
                      </Box>
                    </div>
                  </div>
                  <div>
                    <Box paddingBottom={5}>
                      <DefaultButton onClick={SignUp} backgroundColor={COLORS.PrimaryColor} title="Registrar" />
                    </Box>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}