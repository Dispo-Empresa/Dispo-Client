import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import ContentPage from "../../../layouts/content/ContentPage";
import ContentDivisor from "../../../components/structured/divisor/ContentDivisor";
import useFields from "./useFields";
import { ImageField } from "../../../components/ui/inputs/image/ImageField";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { CurrencyField } from "../../../components/ui/inputs/currency/CurrencyField";
import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";
import { SelectWithFilter } from "../../../components/ui/inputs/select/SelectField";

function ProductRegisterCard() {
  const [
    fields,
    errors,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
  ] = useFields();

  const [showAlert, openAlert] = useAlertScheme();

  const RegisterProduct = async () => {
    if (handleValidateRequiredFields()) {
      openAlert("error", "Existem campos obrigatórios não respondidos");
      return;
    }

    if (handleValidateErrorFields()) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
      return;
    }

    openAlert("success", "Sucesso", "Produto registrado com sucesso!");
    handleClearFields();
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
              label="Nome do produto"
              value={fields.name}
              error={errors.name}
              onChange={(value) =>
                handleFieldChange("name", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              required
              label="Preço de compra"
              value={fields.purchasePrice}
              onChange={(value) => handleFieldChange("purchasePrice", value)}
            />
          </MDBCol>
          <MDBCol>
            <CurrencyField
              required
              label="Preço de venda"
              value={fields.salePrice}
              error={errors.salePrice}
              onChange={(value) => handleFieldChange("salePrice", value)}
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              required
              label="Categoria"
              options={fields.categoryTypes}
              value={fields.category}
              error={errors.category}
              onChange={(value) =>
                handleFieldChange("category", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <SelectWithFilter
              required
              label="Unidade de peso"
              options={fields.unitOfMeasurementTypes}
              value={fields.unitOfMeasurement}
              error={errors.unitOfMeasurement}
              onChange={(value) =>
                handleFieldChange("unitOfMeasurement", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <TextArea
              required
              label="Descrição"
              value={fields.description}
              onChange={(value) =>
                handleFieldChange("description", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <ImageField required label="Imagem" />
          </MDBCol>
          <ContentDivisor title="Dimensões do produto" />
          <MDBCol>
            <TextField
              label="Peso"
              type="number"
              value={fields.weight}
              onChange={(value) =>
                handleFieldChange("weight", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <TextField
              label="Altura"
              type="number"
              value={fields.height}
              onChange={(value) =>
                handleFieldChange("height", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <TextField
              label="Largura"
              type="number"
              value={fields.width}
              onChange={(value) =>
                handleFieldChange("width", value.target.value)
              }
            />
          </MDBCol>
          <MDBCol>
            <TextField
              label="Profundidade"
              type="number"
              value={fields.depth}
              onChange={(value) =>
                handleFieldChange("depth", value.target.value)
              }
            />
          </MDBCol>
        </RegisterPanel>
      </ContentPage>
    </div>
  );
}

export default ProductRegisterCard;
