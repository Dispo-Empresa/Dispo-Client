import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import useFetch from "../../../../hooks/useFetchApi"
import useForm from "../../../../hooks/useForm"
import Tabs from "../../../../components/structured/tabs/Tabs"
import TextField from "../../../../components/ui/textfields/form/TextField"
import { FormView } from "../../../../layouts/form/visualization/Visualization";

function ModalEdit(props) {

    //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/Providers/getProviderById/' + props.providerId);
    //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
    //const initialState = {
    //  providerName: data.data.name,
    //  providerCnpj: data.data.cnpj,
    //};
//
    //function MainInfo() {
    //    return (
    //        <MDBRow className='g-4'>
    //            <MDBCol md='6'>
    //                <TextField label="Name" value={values.providerName} onChange={handleChange} />
    //            </MDBCol>
    //            <MDBCol md='6'>
    //                <TextField label="CNPJ" value={values.providerCnpj} onChange={handleChange} />
    //            </MDBCol>
    //        </MDBRow>
    //    );
    //}
//
    //function AdditionalInfo() {
    //    return (
    //        <MDBRow className='g-5'>
    //            <MDBCol>
    //            </MDBCol>
    //        </MDBRow>
    //    );
    //}
//
    //const tabs = [
    //  { id: 1, title: 'Informações Principais', content: <MainInfo /> },
    //  { id: 2, title: 'Informações Adicionais', content: <AdditionalInfo /> },
    //];
//
    //return (
    //    <FormView onSave={() => { alert("Salvando dados do fornecedor") } } onDelete={() => { alert("Deletando dados do fornecedor") } }>
    //        <Tabs tabs={tabs} />
    //    </FormView>
    //);
}

export default ModalEdit;