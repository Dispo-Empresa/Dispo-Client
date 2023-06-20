import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs";
import useFetch from "../../../../hooks/useFetchApi";
import { TextField } from "../../../../components/ui/inputs/textfield/TextField";
import { FormView } from "../../../../layouts/panel/view/ViewPanel";

function ModalView({ providerId }) {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/Providers/getProviderById/" + providerId
  );

  function MainInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextField label="Name" value={data.name} />
          </MDBCol>
          <MDBCol>
            <TextField label="CNPJ" value={data.cnpj} />
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
