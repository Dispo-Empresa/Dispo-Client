import React from "react"
import MainContent from "../../../components/Structured/Layouts/Content/MainContent";

import { useState } from "react";
import { COLORS } from "../../../config/defaultColors"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton";
import { DefaultTextField } from "../../../components/Basic/TextField/TextField";
import { handleRegisterBrand } from "../../../services/Brand/brandServices"
import { Box } from '@material-ui/core';


export default function BrandRegistrationCard() {

  const [brandName, setBrandName] = useState();
  const [alertMessage, setAlertMessage] = useState([]);

  const RegisterBrand = () => {

    var data = {
      name: brandName
    };

    handleRegisterBrand(data)
      .then(function(res){
        
        setAlertMessage([{ description: res.data.message, type: res.data.alertType }]);

      })
      .catch(function(err){

        if (err.response.data){
          setAlertMessage([{ description: err.response.data.message, type: "error" }]);
        }else{
          setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
        }

      })
  };

  return (
    <MainContent title="Cadastro de Marca" AlertMessage={alertMessage}>
      <div class="container">
        <div class="content">
          <form action="#">
            <div class="user-details">
              <div class="input-box">
                <Box paddingTop={5}>
                  <DefaultTextField label="Informe a marca" variant="outlined" type="text" 
                            value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                </Box>
              </div>
            </div>
          </form>
          <div>
            <Box paddingTop={3} paddingBottom={5}>
              <DefaultButton backgroundColor={COLORS.PrimaryColor} title="Cadastrar marca" width="250px" height="50px"  
                              onClick={RegisterBrand} />
            </Box>
          </div>
        </div>
      </div>
    </MainContent>
  );
}