import React from "react"
import MainContent from "../../../components/Structured/Layouts/Content/MainContent"
import Form from "../../../components/Structured/Layouts/Content/FormRegistration/Form";

import { useState } from "react";
import { DefaultTextField } from "../../../components/Basic/TextField/TextField";
import { handleRegisterProvider } from "../../../services/Providers/providersServices"
import { cnpjChange } from "../../../utils/helperFunctions";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

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
    <MainContent title="Cadastro de Fornecedor" alertMessage={alertMessage}>
      <Form width="1000px" onSave={RegisterProvider}>

        <MDBRow className='g-4'>
          <MDBCol md='6'>
            <DefaultTextField label="Informe o nome do Fornecedor" variant="outlined" type="text" 
                              value={providerName} onChange={(e) => setProviderName(e.target.value)} />
          </MDBCol>
          <MDBCol md='6'>
            <DefaultTextField label="Informe o CNPJ do Fornecedor" variant="outlined" type="text" 
                              value={providerCnpj} onChange={(e) => setProviderCnpj(cnpjChange(e))} />
          </MDBCol>
        </MDBRow>

      </Form>
    </MainContent>
  );
}