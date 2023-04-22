import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Tabs from "../../../../components/structured/tabs/Tabs"
import useFetch from "../../../../hooks/useFetchApi"
import useForm from "../../../../hooks/useForm"
import TextField from "../../../../components/ui/textfields/form/TextField"
import TextArea from "../../../../components/ui/textfields/form/TextArea"
import SelectField from "../../../../components/ui/textfields/form/SelectField"
import CurrencyField from "../../../../components/ui/textfields/form/CurrencyField"
import { FormView } from "../../../../layouts/form/visualization/Visualization";

function ModalEdit(props) {

    //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/Products/getProductById/' + props.ProductId);
    //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
    //const initialState = {
    //  name: data.data.name,
    //  unitPrice: data.data.unitPrice,
    //  color: data.data.color,
    //  code: data.data.code,
    //  code: data.data.code,
    //  description: data.data.description,
    //  unitOfMeansurement: data.data.name,
    //  type: data.data.type,
    //  brand: data.data.brand,
    //  inventoryId: data.data.inventoryId,
    //};
//
    //const selectTest = [
    //  { label: "Teste", value: "teste" },
    //  { label: "Teste2", value: "teste2" },
    //  { label: "Teste3", value: "teste3" },
    //  { label: "Teste4", value: "teste4" },
    //];
//
    //function MainInfo() {
    //    return (
    //        <MDBRow className='g-5'>
    //            <MDBCol>
    //                <TextField label="Nome" value={values.name} onChange={handleChange} />
    //            </MDBCol>
    //            <MDBCol>
    //                <CurrencyField label="Valor unitário" value={values.unitPrice} onChange={handleChange} />
    //            </MDBCol>
    //            <MDBCol>
    //                <SelectField label="Cor" value={values.color} onChange={handleChange} options={selectTest} />
    //            </MDBCol>
    //            <MDBCol>
    //                <TextField label="Code" value={values.code} disabled />
    //            </MDBCol>
    //            <MDBCol>
    //                <SelectField label="Brand" value={values.brand} onChange={handleChange} options={selectTest} />
    //            </MDBCol>
    //            <MDBCol>
    //                <SelectField label="Inventory" value={values.inventoryId} onChange={handleChange} options={selectTest} />
    //            </MDBCol>
    //        </MDBRow>
    //    );
    //}
//
    //function AdditionalInfo() {
    //    return (
    //        <MDBRow className='g-5'>
    //            <MDBCol>
    //                <TextArea label="Description" value={values.description} onChange={handleChange} />
    //            </MDBCol>
    //            <MDBCol>
    //                <SelectField label="UnitOfMeansurement" value={values.unitOfMeansurement} onChange={handleChange} options={selectTest} />
    //            </MDBCol>
    //            <MDBCol>
    //                <SelectField label="Type" value={values.type} onChange={handleChange} options={selectTest} />
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
    //    <FormView onSave={() => { alert("Salvando dados do produto") } } onDelete={() => { alert("Deletando dados do produto") } }>
    //        <Tabs tabs={tabs} />
    //    </FormView>
    //);
};

export default ModalEdit;