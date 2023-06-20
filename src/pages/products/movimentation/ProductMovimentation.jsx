import { MDBCol } from "mdb-react-ui-kit";
import { GenericButton } from "../../../components/ui/buttons/icons/IconButton";
import { SelectWithFilter } from "../../../components/ui/textfields/form/SelectField";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import TextField from "../../../components/ui/textfields/form/TextField";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import useFields from "./useFields";
import ArchiveIcon from "@mui/icons-material/Archive";

import useFetch from "../../../hooks/useFetchApi";
import { post } from "../../../services/api/crud";

const ProductMovimentation = () => {
  const [
    fields,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    handleFieldChange,
    clearState,
    productError,
    warehouseError,
    quantityError,
    movimentationTypeError,
  ] = useFields();
  const { data } = useFetch("Products/getProductNamesWithCode");
  const [showAlert, openAlert] = useAlertScheme();

  const MoveProduct = async () => {
    var data = {
      productId: fields.product,
      warehouseId: fields.warehouse,
      quantity: fields.quantity,
      movementType: fields.movimentationType,
    };

    console.log(data);

    if (handleExistsRequiredFieldsNotAnswered()) {
      openAlert("error", "Existem campos obrigatórios não respondidos.");
      return;
    }

    if (handleExistsFieldsWithError()) {
      openAlert("error", "Existem campos com erros");
      return;
    }

    try {
      let response = await post("Products/moveProduct", data);

      clearState();
      openAlert("success", "Movimentação de Produtos", response.message);
    } catch (err) {
      console.log(err);
      openAlert("error", "Movimentação de Produtos", err.message);
    }
  };

  return (
    <ContentPage title="Movimentação de Produtos">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações da movimentação"
        hideSaveButton={true}
        buttons={
          <ButtonGroup>
            <GenericButton
              title="Movimentar Produto"
              color="#228DED"
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
            onChange={(value) =>
              handleFieldChange("movimentationType", value.target.value)
            }
            error={movimentationTypeError}
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            required
            label="Produto"
            options={data}
            value={fields.product}
            onChange={
              (value) => console.log(value.target)
              //handleFieldChange("product", value.target.value)
            }
            error={productError}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            type="number"
            label="Quantidade"
            value={fields.quantity}
            onChange={(value) =>
              handleFieldChange("quantity", value.target.value)
            }
            error={quantityError}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
};

export default ProductMovimentation;
