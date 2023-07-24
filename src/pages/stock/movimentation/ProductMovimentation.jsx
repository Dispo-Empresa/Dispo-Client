import ArchiveIcon from "@mui/icons-material/Archive";
import { MDBCol } from "mdb-react-ui-kit";

import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import useFields from "./useFields";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { SelectWithFilter } from "../../../components/ui/inputs/select/SelectField";
import { GenericButton } from "../../../components/ui/buttons/icons/IconButton";
import { post } from "../../../services/httpMethods";

function ProductMovimentation() {
  const [
    fields,
    errors,
    products,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
  ] = useFields();
  const [showAlert, openAlert] = useAlertScheme();

  const MoveProduct = async () => {
    var data = {
      productId: fields.product,
      warehouseId: 1,
      quantity: fields.quantity,
      movementType: fields.movimentationType,
    };

    if (handleValidateRequiredFields()) {
      openAlert("error", "Existem campos obrigatórios não respondidos.");
      return;
    }

    const errorFields = handleValidateErrorFields();
    if (errorFields) {
      openAlert("error", "Existem campos com erros!", errorFields);
      return;
    }

    try {
      let response = await post("Products/moveProduct", data);

      if (response.response && response.response.status === 400) {
        openAlert(
          "error",
          "Movimentação de Produtos",
          response.response.data.message
        );
        return;
      }

      openAlert("success", "Movimentação de Produtos", response.message);
      handleClearFields();
    } catch (err) {
      console.log(err);
      openAlert("error", "Movimentação de Produtos", err.message);
    }
  };

  return (
    <ContentPage title="Movimentação de Produtos">
      <RegisterPanel
        alertPanel={showAlert}
        hideSaveButton={true}
        buttons={
          <ButtonGroup>
            <GenericButton
              title="Movimentar Produto"
              color="#009EF7"
              icon={<ArchiveIcon />}
              onClick={MoveProduct}
            />
          </ButtonGroup>
        }
      >
        <MDBCol>
          <SelectWithFilter
            required
            label="Tipo de Movimentação"
            options={fields.movimentationTypes}
            value={fields.movimentationType}
            error={errors.movimentationType}
            onChange={(value) =>
              handleFieldChange("movimentationType", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            required
            label="Produto"
            options={products}
            value={fields.product}
            error={errors.product}
            onChange={(value) =>
              handleFieldChange("product", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            type="number"
            label="Quantidade"
            value={fields.quantity}
            error={errors.quantity}
            onChange={(value) =>
              handleFieldChange("quantity", value.target.value)
            }
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ProductMovimentation;
