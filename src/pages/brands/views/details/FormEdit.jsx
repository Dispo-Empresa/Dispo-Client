import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs";
import TextField from "../../../../components/ui/textfields/form/TextField";
import useForm from "../../../../hooks/useForm";
import useFetch from "../../../../hooks/useFetchApi";
import { FormEdit } from "../../../../layouts/panel/view-panel/ViewPanel";

export default function ModalEdit({ brandId }) {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/Brands/getBrandById/" + brandId
  );
  const { handleInputChange } = useForm(null);

  function MainInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextField
              label="Name"
              value={data.name}
              onChange={handleInputChange}
            />
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
        alert("Salvando dados da marca");
      }}
      onDelete={() => {
        alert("Deletando dados da marca");
      }}
    >
      <Tabs tabs={tabs} />
    </FormEdit>
  );
}
