import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs";
import useFetch from "../../../../hooks/useFetchApi";
import useForm from "../../../../hooks/useForm";
import TextField from "../../../../components/ui/textfields/form/TextField";
import TextArea from "../../../../components/ui/textfields/form/TextArea";
import CurrencyField from "../../../../components/ui/textfields/form/CurrencyField";
import { SelectWithFilter } from "../../../../components/ui/textfields/form/SelectField";
import { FormEdit } from "../../../../layouts/panel/view-panel/ViewPanel";

function ModalEdit({ productId }) {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/Products/getProductById/" + productId
  );
  const { handleInputChange } = useForm(null);

  const selectTest = [
    { label: "Teste", value: "teste" },
    { label: "Teste2", value: "teste2" },
    { label: "Teste3", value: "teste3" },
    { label: "Teste4", value: "teste4" },
  ];

  function MainInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextField
              label="Nome"
              value={data.name}
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              label="Valor unitário"
              value={data.unitPrice}
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Cor"
              value={data.color}
              onChange={handleInputChange}
              options={selectTest}
            />
          </MDBCol>
          <MDBCol>
            <TextField label="Code" value={data.code} disabled />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Marca"
              value={data.brand}
              onChange={handleInputChange}
              options={selectTest}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Tipo"
              value={data.type}
              onChange={handleInputChange}
              options={selectTest}
            />
          </MDBCol>
        </MDBRow>
      )
    );
  }

  function AdditionalInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextArea
              label="Descrição"
              value={data.description}
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Unidade de peso"
              value={data.unitOfMeansurement}
              onChange={handleInputChange}
              options={selectTest}
            />
          </MDBCol>
        </MDBRow>
      )
    );
  }

  const tabs = [
    { id: 1, title: "Informações Principais", content: <MainInfo /> },
    { id: 2, title: "Informações Adicionais", content: <AdditionalInfo /> },
  ];

  return (
    <FormEdit
      onSave={() => {
        alert("Salvando dados do produto");
      }}
      onDelete={() => {
        alert("Deletando dados do produto");
      }}
    >
      <Tabs tabs={tabs} />
    </FormEdit>
  );
}

export default ModalEdit;
