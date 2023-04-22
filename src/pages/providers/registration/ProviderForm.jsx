import { useState } from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Main from "../../../layouts/content/Main";
import Registration from "../../../layouts/form/registration/Registration";
import useForm from '../../../hooks/useForm';
import TextField from "../../../components/ui/textfields/form/TextField";
import { cnpjChange } from "../../../utils/helperFunctions";
import { create } from "../../../services/api/crud"

function ProviderForm() {

    //const [alertMessage, setAlertMessage] = useState([]);
//
    //const initialState = {
    //    providerName: "",
    //    providerCnpj: ""
    //};
//
    //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
    //const RegisterProvider = () => {
//
    //    var data = {
    //        name: values.providerName,
    //        cnpj: values.providerCnpj
    //    };
//
    //    try {
//
    //        let response = create("/Providers/register" , data);
    //        setAlertMessage([{ description: response.message, type:response.alertType }])
//
    //    }catch (err) {
//
    //        if(err.response.data){
    //            setAlertMessage([{ description: err.response.data.message, type: "error" }]);
    //        }else{
    //            setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
    //        }
    //    }
//
    //};
//
    //return (
    //    <Main title="Cadastro de Fornecedor" alertMessage={alertMessage}>
    //        <Registration width="1000px" onSave={(event) => handleSubmit(event, RegisterProvider)}>
    //            <MDBRow className='g-4'>
    //                <MDBCol md='6'>
    //                    <TextField label="Informe o nome do Fornecedor" variant="outlined"
    //                               value={values.providerName} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol md='6'>
    //                    <TextField label="Informe o CNPJ do Fornecedor" variant="outlined" type="text" 
    //                               value={values.providerCnpj} onChange={handleChange} />
    //                </MDBCol>
    //            </MDBRow>
    //        </Registration>
    //    </Main>
    //);
}

export default ProviderForm;