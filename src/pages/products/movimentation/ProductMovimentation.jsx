import { MDBCol } from "mdb-react-ui-kit";
import { GenericButton } from "../../../components/ui/buttons/icons/IconButton";
import { FiBox } from "react-icons/fi";
import { SelectWithFilter } from "../../../components/ui/textfields/form/SelectField";
import React, { useEffect, useState } from "react";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import TextField from "../../../components/ui/textfields/form/TextField";
import axios from "axios";
import endpoints from "../../../services/api/endpoints";
import useAlertScheme from "../../../hooks/useAlertScheme";
import useFields from "./useFields";

const ProductMovimentation = () => {
  const [fields, handleErrorFields, handleFieldChange, clearState, existsRequiredFieldsNotAnswered] =
    useFields();

  const [products, setProducts] = useState([]);
  const [showAlert, openAlert] = useAlertScheme();

  const MoveProduct = () => {
    if (existsRequiredFieldsNotAnswered()) {
      openAlert("error", "Existem campos obrigatórios não respondidos.");
      return;
    }

    let error = handleErrorFields();
    if (error !== undefined) {
      openAlert("error", "Movimentação de Produtos", error.value);
      return;
    }

    axios
      .post(`https://localhost:7153/api/v1/${endpoints.products.moveProduct}`, {
        productId: fields.product,
        warehouseId: fields.warehouse,
        quantity: fields.quantity,
        movementType: fields.movimentationType,
      })
      .then((response) => {
        clearState();
        openAlert("success", "Movimentação de Produtos", response.data.message);
      })
      .catch((error) => {
        console.log(error);
        openAlert(
          "error",
          "Movimentação de Produtos",
          error.response.data.message
        );
      });
  };

  const GetProducts = () => {
    const config = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    axios
      .get(
        `https://localhost:7153/api/v1/${endpoints.products.getAllProducts}`,
        config
      )
      .then((response) => {
        setProducts(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(GetProducts, [setProducts]);

  return (
    <ContentPage title="Movimentação de Produtos">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações da movimentação"
        buttons={
          <ButtonGroup>
            <GenericButton
              title="Movimentar Produto"
              color="#228DED"
              icon={<FiBox className="form-icons" />}
              onClick={MoveProduct}
            />
          </ButtonGroup>
        }
        hideSaveButton={true}
      >
        <MDBCol>
          <SelectWithFilter
            label="Tipo de Movimentação"
            name="movimentationType"
            options={fields.movimentationTypes}
            value={fields.movimentationType}
            onChange={handleFieldChange}
            error={
              fields.errors.find((f) => f.name === "movimentationType")?.value
            }
            required
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            label="Produto"
            name="product"
            options={products}
            value={fields.product}
            onChange={handleFieldChange}
            error={fields.errors.find((f) => f.name === "product")?.value}
            required
          />
        </MDBCol>
        <MDBCol>
          <TextField
            label="Quantidade"
            name="quantity"
            value={fields.quantity}
            onChange={handleFieldChange}
            autocomplete={false}
            error={fields.errors.find((f) => f.name === "quantity")?.value}
            required
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
};

export default ProductMovimentation;
