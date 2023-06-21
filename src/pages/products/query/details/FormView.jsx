import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import Tabs from "../../../../components/structured/tabs/Tabs";
import useFetch from "../../../../hooks/useFetchApi";
import { TextField } from "../../../../components/ui/inputs/textfield/TextField";
import { TextArea } from "../../../../components/ui/inputs/textarea/TextArea";
import { CurrencyField } from "../../../../components/ui/inputs/currency/CurrencyField";
import { FormView } from "../../../../layouts/panel/view/ViewPanel";

function ModalView({ productId }) {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/Products/getProductById/" + productId
  );

  function MainInfo() {
    return (
      data && (
        <MDBRow className="g-5">
          <MDBCol>
            <TextField label="Nome" value={data.name} />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              label="Valor unitário"
              value={data.unitPrice}
              disabled
            />
          </MDBCol>
          <MDBCol>
            <TextField label="Cor" value={data.color} />
          </MDBCol>
          <MDBCol>
            <TextField label="Código" value={data.code} />
          </MDBCol>
          <MDBCol>
            <TextField label="Marca" value={data.brandId} />
          </MDBCol>
          <MDBCol>
            <TextField label="Tipo" value={data.type} />
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
            <TextArea label="Descrição" value={data.description} disabled />
          </MDBCol>
          <MDBCol>
            <TextField
              label="Unidade de peso"
              value={data.unitOfMeansurement}
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
    <FormView>
      <Tabs tabs={tabs} />
    </FormView>
  );
}

export default ModalView;
