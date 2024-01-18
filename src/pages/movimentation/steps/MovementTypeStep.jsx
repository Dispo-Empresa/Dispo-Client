import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";
import useAlertScheme from "hooks/alert/useAlertScheme";
import useFetch from "hooks/useFetchApi";
import ViewPanel from "layouts/panel/view/ViewPanel";
import Datatable from "components/structured/datatable/Datatable";
import { ENDPOINTS } from "utils/constants/endpoints";
import { StepLayout } from "components/structured/stepper/Stepper";
import { CurrencyField } from "components/ui/inputs/currency/CurrencyField";
import { Datefield } from "components/ui/inputs/date/DateField";
import { NumberField } from "components/ui/inputs/number/NumberField";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";
import { MovementType } from "utils/constants/enums";
import { validateMovementTypeStep } from "./validate";
import { get } from "services/httpMethods";

function MovementTypeStep(props) {
  const types = [
    { value: MovementType.Input, label: "Entrada" },
    { value: MovementType.Output, label: "Saída" },
  ];

  const [products, setProducts] = useState(null);
  const [purchaseOrders, setPurchaseOrders] = useState(null);
  const [purchaseOrderSelected, setPurchaseOrderSelected] = useState(null);
  const [totalQuantityProducts, setTotalQuantityProducts] = useState(null);
  const [isMultiplePurchaseOrders, setIsMultiplePurchaseOrders] =
    useState(false);
  const [showAlert, openAlert] = useAlertScheme();

  const columns = [
    { field: "purchaseOrderNumber", header: "Ordem de compra" },
    { field: "purchaseOrderDate", header: "Data da OC" },
    { field: "orderQuantity", header: "Quantidade" },
    { field: "supplierName", header: "Fornecedor" },
  ];

  const formik = useFormik({
    initialValues: {
      type: "",
      date: new Date(),
      product: "",
      quantity: "",
      unitPrice: "",
    },
    validationSchema: validateMovementTypeStep,
    validateOnChange: false,
    onSubmit: async (values) => {
      props.setMovementType(values.type);
      props.setProductInfoCallBack(values);
      props.nextStep();
    },
  });

  useEffect(() => {
    if (purchaseOrders && purchaseOrders.data.length < 1) {
      return;
    } else if (purchaseOrders && purchaseOrders.data.length > 1) {
      setIsMultiplePurchaseOrders(true);
    } else {
      setIsMultiplePurchaseOrders(false);
    }

    if (isMultiplePurchaseOrders || purchaseOrders == null) return;

    let indexPreSelecionado = 0;

    setPurchaseOrderSelected(purchaseOrders.data[indexPreSelecionado]);
  }, [purchaseOrders, isMultiplePurchaseOrders]);

  const handleSelectOcRow = (index) => {
    setPurchaseOrderSelected(index);
  };

  const handleSelectProduct = async (e) => {
    formik.setFieldValue("product", e.value);
    formik.setFieldValue(
      "unitPrice",
      products.at((product) => product.id === e.value).purchasePrice
    );

    var purchaseOrdersByProduct = await get(
      ENDPOINTS.purchaseorder.getByProduct,
      e.value
    );

    setPurchaseOrders(purchaseOrdersByProduct);

    var totalQuantityProductsResponse = await get(
      ENDPOINTS.batches.getTotalQuantityOfProducts,
      e.value
    );

    if (totalQuantityProductsResponse.success) {
      setTotalQuantityProducts(totalQuantityProductsResponse.data);
    }
  };

  const handleNextStep = () => {
    if (props.type == MovementType.Input && !purchaseOrderSelected) {
      openAlert("warning", "Selecione uma Ordem de compra para prosseguir");
    } else if (formik.values.quantity > totalQuantityProducts) {
      openAlert(
        "warning",
        "Quantidade inserida é maior que a quantidade total de produtos"
      );
    } else {
      props.setPurchaseOrderCallBack(purchaseOrderSelected);
      formik.handleSubmit();
    }
  };

  const handleChangeQuantity = (e) => {
    formik.setFieldValue("quantity", e.target.value);
    props.setQuantity(e.target.value);
  };

  const handleChangeType = async (e) => {
    formik.setFieldValue("type", e.target.value);
    formik.setFieldValue("product", null);
    formik.setFieldValue("unitPrice", null);
    formik.setFieldValue("quantity", null);

    const productsResponse = await get(
      ENDPOINTS.products.getWithActivePurschaseOrder,
      e.target.value
    );

    if (productsResponse.success) {
      setProducts(productsResponse.data);
    }
  };

  const purchaseOrderSelectedComponent = () => {
    return (
      <div>
        <label
          style={{
            fontFamily: "sans-serif",
            fontSize: "16px",
            color: "#029DBE",
            fontWeight: "bold",
          }}
        >
          Ordem de compra
        </label>
        <div
          style={{
            height: "80px",
            border: "1px solid #5d5f66",
            borderRadius: "20px",
            boxShadow: "0px 0px 1px #5d5f66",
            margin: "auto",
            padding: "25px 20px",
          }}
        >
          <div>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Código da OC:
            </label>
            {` ${purchaseOrderSelected.purchaseOrderNumber}`}
            <b>&nbsp; - &nbsp;&nbsp;</b>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Data da OC:
            </label>
            {" " +
              new Date(
                purchaseOrderSelected.purchaseOrderDate
              ).toLocaleDateString("pt-BR")}
            <b>&nbsp; - &nbsp;&nbsp;</b>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Fornecedor:
            </label>
            {` ${purchaseOrderSelected.supplierName}`}
            <b>&nbsp; - &nbsp;&nbsp;</b>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Quantidade de produto:
            </label>
            {` ${purchaseOrderSelected.orderQuantity}`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <StepLayout {...props} onNextStep={handleNextStep} alertPanel={showAlert}>
      <RegisterPanelSimple>
        <MDBCol>
          <SelectWithFilter
            required
            label="Tipo"
            options={types}
            value={formik.values.type}
            error={formik.errors.type}
            onChange={handleChangeType}
            width="250px"
          />
        </MDBCol>
        <MDBCol>
          {products && (
            <SelectWithFilter
              required
              label="Produto"
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
              value={formik.values.product}
              error={formik.errors.product}
              onChange={handleSelectProduct}
              width="400px"
              emptyFilterMessage={
                <span style={{ fontSize: "14px" }}>
                  {formik.values.type == MovementType.Input ? (
                    <div>
                      Produto informado não tem uma{" "}
                      <a href="/ordem-de-compra/cadastrar">Ordem de Compra</a>{" "}
                      ativa ou não existe
                    </div>
                  ) : (
                    <div>
                      Produto informado pode não estar em estoque ou não existe
                    </div>
                  )}
                </span>
              }
            />
          )}
        </MDBCol>
        {formik.values.type === MovementType.Output &&
          formik.values.product && (
            <MDBCol>
              <NumberField
                required
                label="Quantidade"
                tip="Quantidade total para retirada"
                value={formik.values.quantity}
                error={formik.errors.quantity}
                onChange={handleChangeQuantity}
              />
              {totalQuantityProducts && (
                <label
                  style={{
                    fontSize: "14px",
                    color: "#FAAD14",
                    fontWeight: "600",
                  }}
                >
                  Total de {totalQuantityProducts} produtos
                </label>
              )}
            </MDBCol>
          )}
        <MDBCol>
          <CurrencyField
            required
            label="Preço unitário"
            value={formik.values.unitPrice}
            error={formik.errors.unitPrice}
            onChange={(e) => formik.setFieldValue("unitPrice", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            label="Data"
            value={formik.values.date}
            error={formik.errors.date}
            onChange={(e) => formik.setFieldValue("date", e.target.value)}
          />
        </MDBCol>
      </RegisterPanelSimple>
      {formik.values.product &&
        purchaseOrderSelected &&
        formik.values.type == MovementType.Input &&
        purchaseOrderSelectedComponent()}
      <div>
        {isMultiplePurchaseOrders &&
          formik.values.type == MovementType.Input && (
            <ViewPanel>
              <Datatable
                showCheckbox
                fromApi
                singleSelect
                setSelectedItens={handleSelectOcRow}
                selectedItens={purchaseOrderSelected}
                columns={columns}
                data={purchaseOrders}
              />
            </ViewPanel>
          )}
      </div>
    </StepLayout>
  );
}

export default MovementTypeStep;
