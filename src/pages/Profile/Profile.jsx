import React, { useState } from "react"
import Sidebar from "../../components/Structured/Sidebar/Sidebar"

import { Card, CardContent } from '@material-ui/core';
import { DefaultTextField } from "../../components/Basic/TextField/TextField";
import { DefaultButton } from "../../components/Basic/Button/Default/DefaultButton";
import { Box } from "@mui/system";
import { getUserId, setUserInfo } from "../../services/Getters/lsUserInfoService"
import { handleUpdateUserAccountInfo } from "../../services/UserAccount/profileCallAPI"
import { COLORS, BACKGROUNDS } from "../../config/defaultColors"
import { AlertMessagePanel } from "../../components/Structured/Notifications/MessagePanel/AlertMessagePanel"

import "../../styles/registrationContent.css"

export default function ProfileCard() {

  const userInfo = JSON.parse(localStorage.getItem('accessUserInfo'));

  const [userInfoFirstName, setUserInfoFirstName] = useState(userInfo.firstName);
  const [userInfoLastName, setUserInfoLastName] = useState(userInfo.lastName);
  const [userInfoCpfCnpj, setUserInfoCpfCnpj] = useState(userInfo.cpfCnpj);
  const [userInfoPhone, setUserInfoPhone] = useState(userInfo.phone);
  const [userInfoBirthDate, setUserInfoBirthDate] = useState(userInfo.birthDate);
  const [userInfoEmail, setUserInfoEmail] = useState(userInfo.email);
  
  const [alertMessage, setAlertMessage] = useState([]);

  const UpdateUserAccountInfo = () => {

    var dataRequest = {
      FirstName: userInfoFirstName,
      LastName: userInfoLastName,
      CpfCnpj: userInfoCpfCnpj,
      Phone: userInfoPhone,
      BirthDate: userInfoBirthDate,
      Email: userInfoEmail
    };

    handleUpdateUserAccountInfo(getUserId(), dataRequest)
    .then(function(res){

      setUserInfo({
        birthDate: res.data.birthDate,
        cpfCnpj: res.data.cpfCnpj,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phone: res.data.phone
      });

      setAlertMessage([{ description: res.data.message, type: res.data.alertType }]);

    })
    .catch(function(err){

      if (err.response.data){
        setAlertMessage([{ description: err.message, type: "error" }]);
      }else{
        setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
      }

      console.log(err.response);
    });
  };

  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="Perfil" contentMarginLeft="4%">
        <div>
          { alertMessage && alertMessage.map(item => <AlertMessagePanel type={item.type} description={item.description} />) }
        </div>
        <div style={{ marginLeft: "4%", width: "1400px" }}>
          <Card>
            <CardContent>
              <div class="container">
                <div class="content">
                  <form action="#">
                    <div class="user-details">
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="E-mail" variant="standard" type="email" 
                                            value={ userInfoEmail } onChange={(e)=> setUserInfoEmail(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="FirstName" variant="standard" type="text" 
                                            value={ userInfoFirstName } onChange={(e)=> setUserInfoFirstName(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="LastName" variant="standard" type="text" 
                                            value={ userInfoLastName } onChange={(e)=> setUserInfoLastName(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="CpfCnpj" variant="standard" type="text" 
                                            value={ userInfoCpfCnpj } onChange={(e)=> setUserInfoCpfCnpj(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="Phone" variant="standard" type="text" 
                                            value={ userInfoPhone } onChange={(e)=> setUserInfoPhone(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="BirthDate" variant="standard" type="text" 
                                            value={ userInfoBirthDate } onChange={(e)=> setUserInfoBirthDate(e.target.value) } />
                        </Box>
                      </div>
                    </div>
                    <div>
                      <Box paddingTop={5} paddingBottom={5}>
                        <DefaultButton backgroundColor={COLORS.PrimaryColor} title="Atualizar" 
                                       onClick={UpdateUserAccountInfo} width="300px" height="50px" />
                      </Box>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}