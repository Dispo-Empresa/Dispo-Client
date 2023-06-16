import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import ContentPage from "../../../layouts/content/ContentPage";
import TextField from "../../../components/ui/textfields/form/TextField";
import CurrencyField from "../../../components/ui/textfields/form/CurrencyField";
import TextArea from "../../../components/ui/textfields/form/TextArea";
import ContentDivisor from "../../../layouts/panel/register-panel/ContentDivisor";
import useFields from "./useFields";
import { SelectWithFilter } from "../../../components/ui/textfields/form/SelectField";

const cities = [
  { id: 1, label: "New York" },
  { id: 2, label: "Rome" },
  { id: 3, label: "London" },
];

function ProductRegisterCard() {
  const [
    fields,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    handleFieldChange,
    nameError,
    colorError,
  ] = useFields();

  const [showAlert, openAlert] = useAlertScheme();

  const RegisterProduct = () => {
    if (handleExistsRequiredFieldsNotAnswered()) {
      openAlert("error", "Existem campos obrigatórios não respondidos");
      return;
    }

    if (handleExistsFieldsWithError()) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
      return;
    }

    openAlert("success", "Sucesso", "Produto registrado com sucesso!");
  };

  return (
    <div>
      <ContentPage title="Cadastro de Produto">
        <RegisterPanel
          alertPanel={showAlert}
          title="Informações Básicas"
          onSave={RegisterProduct}
        >
          <MDBCol>
            <TextField
              required
              message="Dica do campo"
              label="Nome do produto"
              value={fields.name}
              onChange={(value) =>
                handleFieldChange("name", value.target.value)
              }
              error={nameError}
            />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              required
              label="Preço unitário"
              value={fields.unitPrice}
              onChange={(value) => handleFieldChange("unitPrice", value)}
            />
          </MDBCol>
          <MDBCol>
            <TextField
              required
              label="Cor"
              value={fields.color}
              placeholder="Ex: #fff"
              onChange={(value) =>
                handleFieldChange("color", value.target.value)
              }
              error={colorError}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              required
              label="Unidade de peso"
              options={cities}
              value={fields.unitOfMeansurement}
              onChange={(value) =>
                handleFieldChange("unitOfMeansurement", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              required
              label="Tipo"
              options={cities}
              value={fields.type}
              onChange={(value) =>
                handleFieldChange("type", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              label="Marca"
              options={cities}
              value={fields.brandId}
              onChange={(value) =>
                handleFieldChange("brandId", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <TextArea
              name="description"
              label="Descrição"
              value={fields.description}
              onChange={(value) =>
                handleFieldChange("description", value.target.value)
              }
            />
          </MDBCol>
          <ContentDivisor title="Dimensões do produto" />
          <MDBCol>
            <TextField label="Peso" />
          </MDBCol>
          <MDBCol>
            <TextField label="Altura" />
          </MDBCol>
          <MDBCol>
            <TextField label="Largura" />
          </MDBCol>
          <MDBCol>
            <TextField label="Profundidade" />
          </MDBCol>
        </RegisterPanel>
      </ContentPage>
    </div>
  );
}

export default ProductRegisterCard;
