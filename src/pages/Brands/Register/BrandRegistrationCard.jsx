import React from "react"
import MainContent from "../../../components/Structured/Layouts/Content/MainContent";
import Form from "../../../components/Structured/Layouts/Content/FormRegistration/Form";

import { useState } from "react";
import { DefaultTextField } from "../../../components/Basic/TextField/TextField";
import { handleRegisterBrand } from "../../../services/Brand/brandServices"
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

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
    <MainContent title="Cadastro de Marca" alertMessage={alertMessage}>
      <Form width="1000px" onSave={RegisterBrand}>

        <MDBRow className='g-4'>
          <MDBCol md='6'>
            <DefaultTextField label="Informe a marca" variant="outlined" type="text" 
                              value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </MDBCol>
        </MDBRow>

      </Form>
    </MainContent>
  );
}