import { useState } from "react"
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Main from "../../layouts/content/Main";
import Registration from "../../layouts/form/registration/Registration";
import useForm from "../../hooks/useForm"
import useFetch from "../../hooks/useFetchApi"
import TextField from "../../components/ui/textfields/form/TextField";
import { getUserId, setUserInfo } from "../../data/storage/user"
import { getLocalStorage } from "../../data/storage/browser/local"
import { update } from "../../services/api/crud";

function Profile() {

    //const userInfo = JSON.parse(getLocalStorage("accessUserInfo")) ?? "";
    //const [alertMessage, setAlertMessage] = useState([]);
    //
    //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/UserAccount/updateUserAccountInfo' + getUserId());
    //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
    //const initialState = {
    //  userInfoFirstName: data.data.firstName,
    //  userInfoLastName: data.data.lastName,
    //  userInfoCpfCnpj: data.data.cpfCnpj,
    //  userInfoPhone: data.data.phone,
    //  userInfoBirthDate: data.data.birthDate,
    //  userInfoEmail: data.data.email
    //};
//
//
    //const UpdateUserAccountInfo = () => {
//
    //    var dataRequest = {
    //      FirstName: values.userInfoFirstName,
    //      LastName: values.userInfoLastName,
    //      CpfCnpj: values.userInfoCpfCnpj,
    //      Phone: values.userInfoPhone,
    //      BirthDate: values.userInfoBirthDate,
    //      Email: values.userInfoEmail
    //    };
    //  
    //    
    //    try {
    //      
    //      let response = update("UserAccount/updateUserAccountInfo", getUserId(), dataRequest);
    //      setAlertMessage([{ description: response.message, type:response.alertType }])
//
    //    }catch (err) {
//
    //        if(err.response.data){
    //            setAlertMessage([{ description: err.response.data.message, type: "error" }]);
    //        }else{
    //            setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
    //        }
    //    }
    //}
//
    //return (
    //    <Main title="Perfil" alertMessage={alertMessage}>
    //        <Registration width="1000px" onSave={UpdateUserAccountInfo}>
    //            <MDBRow className='g-5'>
    //                <MDBCol>
    //                    <TextField label="E-mail" value={userInfo.email} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol>
    //                    <TextField label="FirstName" value={userInfo.firstName} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol>
    //                    <TextField label="LastName" value={userInfo.lastName} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol>
    //                    <TextField label="CpfCnpj" value={userInfo.cpfCnpj} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol>
    //                    <TextField label="Phone" value={userInfo.phone} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol>
    //                    <TextField label="BirthDate" value={userInfo.birthDate} onChange={handleChange} />
    //                </MDBCol>
    //            </MDBRow>
    //        </Registration>
    //    </Main>
    //);
}

export default Profile;