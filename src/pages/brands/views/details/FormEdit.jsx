import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Tabs from "../../../../components/structured/tabs/Tabs"
import TextField from "../../../../components/ui/textfields/form/TextField"
import useForm from "../../../../hooks/useForm"
import useFetch from "../../../../hooks/useFetchApi"
import { FormEdit } from "../../../../layouts/form/visualization/Visualization"

export default function ModalEdit(props) {

  //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/Brands/getBrandById/' + props.brandId);
  //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
  //const initialState = {
  //  brandName: data.data.name
  //};
  //
  //function MainInfo() {
  //  return (
  //    <MDBRow className='g-5'>
  //      <MDBCol>
  //        <TextField label="Name" value={values.brandName} onChange={handleChange} />
  //      </MDBCol>
  //    </MDBRow>
  //  );
  //}
//
  //function AdditionalInfo() {
  //  return (
  //    <MDBRow className='g-5'>
  //      <MDBCol>
  //      </MDBCol>
  //    </MDBRow>
  //  );
  //}
//
  //const tabs = [
  //  { id: 1, title: 'Informações Principais', content: <MainInfo /> },
  //  { id: 2, title: 'Informações Adicionais', content: <AdditionalInfo /> },
  //];
//
  //return (
  //  <FormEdit onSave={() => { alert("Salvando dados da marca") } } onDelete={() => { alert("Deletando dados da marca") } }>
  //    <Tabs tabs={tabs} />
  //  </FormEdit>
  //);
}