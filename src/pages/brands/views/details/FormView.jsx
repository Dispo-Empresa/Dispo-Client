import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs";
import useFetch from "../../../../hooks/useFetchApi";
import TextField from "../../../../components/ui/textfields/views/TextField";
import { FormView } from "../../../../layouts/panel/view-panel/ViewPanel";

function ModalView({ brandId }) {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/Brands/getBrandById/" + brandId
  );

  function MainInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextField label="Name" value={data.name} />
          </MDBCol>
        </MDBRow>
      )
    );
  }

  const tabs = [
    { id: 1, title: "Informações Principais", content: <MainInfo /> },
    { id: 2, title: "Informações Adicionais", content: <></> },
  ];

  return (
    <FormView>
      <Tabs tabs={tabs} />
    </FormView>
  );
}

export default ModalView;