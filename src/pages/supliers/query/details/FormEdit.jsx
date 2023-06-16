import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import useFetch from "../../../../hooks/useFetchApi";
import Tabs from "../../../../components/structured/tabs/Tabs";
import TextField from "../../../../components/ui/textfields/form/TextField";
import { FormEdit } from "../../../../layouts/panel/view-panel/ViewPanel";

function ModalEdit({ providerId }) {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/Providers/getProviderById/" + providerId
  );

  function MainInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextField label="Name" value={data.name} onChange={() => {}} />
          </MDBCol>
          <MDBCol>
            <TextField label="CNPJ" value={data.cpnj} onChange={() => {}} />
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
    <FormEdit
      onSave={() => {
        alert("Salvando dados do fornecedor");
      }}
      onDelete={() => {
        alert("Deletando dados do fornecedor");
      }}
    >
      <Tabs tabs={tabs} />
    </FormEdit>
  );
}

export default ModalEdit;
