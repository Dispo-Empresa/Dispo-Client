import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs"
import useFetch from "../../../../hooks/useFetchApi"
import TextField from "../../../../components/ui/textfields/views/TextField"
import TextArea from "../../../../components/ui/textfields/form/TextArea"
import CurrencyField from "../../../../components/ui/textfields/form/CurrencyField"
import { FormView } from "../../../../layouts/form/visualization/Visualization";

function ModalView(props) {

  //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/Products/getProductById/' + props.ProductId);
//
  //function MainInfo() {
//
  //  return (
  //    <MDBRow className='g-5'>
  //      <MDBCol>
  //        <TextField label="Name" value={data.data.name} />
  //      </MDBCol>
  //      <MDBCol>
  //        <CurrencyField label="UnitPrice" value={data.data.unitPrice} disabled />
  //      </MDBCol>
  //      <MDBCol>
  //        <TextField label="Color" value={data.data.color} />
  //      </MDBCol>
  //      <MDBCol>
  //        <TextField label="Code" value={data.data.code} />
  //      </MDBCol>
  //      <MDBCol>
  //        <TextField label="Brand" value={data.data.brand} />
  //      </MDBCol>
  //      <MDBCol>
  //        <TextField label="Inventory" value={data.data.inventoryId} />
  //      </MDBCol>
  //    </MDBRow>
  //  );
  //}
//
  //function AdditionalInfo() {
  //  return (
  //    <MDBRow className='g-5'>
  //      <MDBCol>
  //        <TextArea label="Description" value={data.data.description} disabled />
  //      </MDBCol>
  //      <MDBCol>
  //        <TextField label="UnitOfMeansurement" value={data.data.unitOfMeansurement} />
  //      </MDBCol>
  //      <MDBCol>
  //        <TextField label="Type" value={data.data.type} />
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
  //  <FormView>
  //    <Tabs tabs={tabs} />
  //  </FormView>
  //);
};

export default ModalView;