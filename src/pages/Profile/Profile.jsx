import React, { useState } from "react"
import MainContent from "../../components/Structured/Layouts/Content/MainContent";
import Form from "../../components/Structured/Layouts/Content/FormRegistration/Form";

import { DefaultTextField } from "../../components/Basic/TextField/TextField";
import { getUserId, setUserInfo } from "../../services/Getters/lsUserInfoService"
import { handleUpdateUserAccountInfo } from "../../services/UserAccount/profileCallAPI"
import { getLocalStorage } from "../../Storage/local"
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBTextArea, MDBSelectTextField, MDBTextField } from "../../components/Basic/TextField/MDBTextField/TextField"

import "../../styles/registrationContent.css"

export default function ProfileCard() {

  const userInfo = JSON.parse(getLocalStorage("accessUserInfo")) ?? "";

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
    <MainContent title="Perfil" alertMessage={alertMessage}>
      <Form width="1000px" onSave={UpdateUserAccountInfo}>
        <MDBRow className='g-5'>
          <MDBCol>
            <MDBTextField label="E-mail" value={ userInfoEmail } onChange={(e)=> setUserInfoEmail(e.target.value) } />
          </MDBCol>
          <MDBCol>
            <MDBTextField label="FirstName" value={ userInfoFirstName } onChange={(e)=> setUserInfoFirstName(e.target.value) } />
          </MDBCol>
          <MDBCol>
            <MDBTextField label="LastName" value={ userInfoLastName } onChange={(e)=> setUserInfoLastName(e.target.value) } />
          </MDBCol>
          <MDBCol>
            <MDBTextField label="CpfCnpj" value={ userInfoCpfCnpj } onChange={(e)=> setUserInfoCpfCnpj(e.target.value) } />
          </MDBCol>
          <MDBCol>
            <MDBTextField label="Phone" value={ userInfoPhone } onChange={(e)=> setUserInfoPhone(e.target.value) } />
          </MDBCol>
          <MDBCol>
            <MDBTextField label="BirthDate" value={ userInfoBirthDate } onChange={(e)=> setUserInfoBirthDate(e.target.value) } />
          </MDBCol>
        </MDBRow>
      </Form>
    </MainContent>
  );
}