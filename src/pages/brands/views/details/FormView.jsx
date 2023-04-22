import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs"
import useFetch from "../../../../hooks/useFetchApi"
import TextField from "../../../../components/ui/textfields/views/TextField"
import { FormView } from "../../../../layouts/form/visualization/Visualization"

export default function ModalView(props) {

    //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/Brands/getBrandById/' + props.brandId);
//
    //function MainInfo() {
    //    return (
    //        <MDBRow className='g-5'>
    //            <MDBCol>
    //                <TextField label="Name" value={data.data.name} />
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
    //    <FormView>
    //        <Tabs tabs={tabs} />
    //    </FormView>
    //);
}