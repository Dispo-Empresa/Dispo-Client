import React from "react"
import { useState } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Main from "../../../layouts/content/Main";
import Registration from "../../../layouts/form/registration/Registration";
import useForm from '../../../hooks/useForm';
import TextField from "../../../components/ui/textfields/form/TextField";
import { create } from "../../../services/api/crud"

export default function BrandRegistrationCard() {

    //const [alertMessage, setAlertMessage] = useState([]);
  //
    //const initialState = {
    //  brandName: ""
    //};
//
    //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
    //const RegisterBrand = () => {
//
    //  var data = {
    //    name: values.brandName
    //  };
//
    //  try {
//
    //    let response = create("/Brands/register" , data);
    //    setAlertMessage([{ description: response.message, type:response.alertType }])
//
    //  }catch (err) {
//
    //      if(err.response.data){
    //          setAlertMessage([{ description: err.response.data.message, type: "error" }]);
    //      }else{
    //          setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
    //      }
    //  }
    //}
//
    //return (
    //    <Main title="Cadastro de Marca" alertMessage={alertMessage}>
    //        <Registration width="1000px" onSave={RegisterBrand}>
    //            <MDBRow className='g-4'>
    //                <MDBCol md='6'>
    //                    <TextField label="Informe a marca" variant="outlined" type="text" 
    //                               value={values.brandName} onChange={handleChange} />
    //                </MDBCol>
    //            </MDBRow>
    //        </Registration>
    //    </Main>
    //);
}