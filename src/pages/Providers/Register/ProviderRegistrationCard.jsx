import React from "react"
import Sidebar from "../../../components/Structured/Sidebar/Sidebar"

import { useState } from "react";
import { BACKGROUNDS, COLORS } from "../../../config/defaultColors"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton";
import { DefaultTextField } from "../../../components/Basic/TextField/TextField";
import { handleRegisterProvider } from "../../../services/Providers/providersServices"
import { Box, Card, CardContent } from '@material-ui/core';
import { AlertMessagePanel } from "../../../components/Structured/Notifications/MessagePanel/AlertMessagePanel"
import { cnpjChange } from "../../../utils/helperFunctions";

export default function ProviderRegistrationCard() {

  const [providerName, setProviderName] = useState("");
  const [providerCnpj, setProviderCnpj] = useState("");
  const [alertMessage, setAlertMessage] = useState([]);

  const RegisterProvider = () => {

    var data = {
      name: providerName,
      cnpj: providerCnpj
    };

    handleRegisterProvider(data)
        .then(function(res){

            setAlertMessage([{ description: res.data.message, type: res.data.alertType }])
        })
        .catch(function(err){

            if(err.response.data){
                setAlertMessage([{ description: err.response.data.message, type: "error" }]);
            }else{
                setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
            }
        })
  };

  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="Cadastro de Fornecedor" contentMarginLeft="4%">
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
                          <DefaultTextField label="Informe o nome do Fornecedor" variant="outlined" type="text" 
                                            value={providerName} onChange={(e) => setProviderName(e.target.value)} />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="Informe o CNPJ do Fornecedor" variant="outlined" type="text" 
                                            value={providerCnpj} onChange={(e) => setProviderCnpj(cnpjChange(e))} />
                        </Box>
                      </div>
                    </div>
                  </form>
                  <div>
                    <Box paddingTop={3} paddingBottom={5}>
                      <DefaultButton backgroundColor={COLORS.PrimaryColor} title="Cadastrar Fornecedor" width="250px" height="50px"  
                                     onClick={RegisterProvider} />
                    </Box>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}