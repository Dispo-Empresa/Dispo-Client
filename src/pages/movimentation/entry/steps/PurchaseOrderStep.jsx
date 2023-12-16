import { useState, useEffect } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import useFetch from "../../../../hooks/useFetchApi";
import Datatable from "../../../../components/structured/datatable/Datatable";
import ViewPanel from "../../../../layouts/panel/view/ViewPanel";
import RegisterPanelSimple from "../../../../layouts/panel/register/classic/RegisterPanelSimple";
import { SelectWithFilter } from "../../../../components/ui/inputs/select/SelectField";
import { ENDPOINTS } from "../../../../utils/constants/endpoints";
import { StepLayout } from "../../../../components/structured/stepper/Stepper";
import { validatePurchaseOrderStep } from "./validate";

const PurchaseOrderStep = (props) => {
  const { data: products } = useFetch(
    ENDPOINTS.products.getWithActivePurschaseOrder
  );
  const { data: purchaseOrders } = useFetch(
    ENDPOINTS.products.getPurchaseOrders
  );
  const [isMultipleOc, setIsMultipleOc] = useState(false);
  const [noOc, setNoOc] = useState(false);
  const [selectedOc, setSelectedOc] = useState(null);
  const [codeOC, setCodeOC] = useState("");
  const [dateOC, setDateOC] = useState(null);
  const [supplierOC, setSupplierOC] = useState("");
  const [QuantityOC, setQuantityOC] = useState(0);

  const onSelectOcRow = (index) => {
    setSelectedOc(index);
    setCodeOC(index.purchaseOrderNumber);
    setDateOC(new Date(index.purchaseOrderDate).toLocaleDateString("pt-BR"));
    setSupplierOC(index.purchaseOrderSupplierName);
    setQuantityOC(index.orderQuantity);
  };

  useEffect(() => {
    if (purchaseOrders && purchaseOrders.data.length < 1) {
      setNoOc(true);
      return;
    } else if (purchaseOrders && purchaseOrders.data.length > 1) {
      setIsMultipleOc(true);
    } else {
      setNoOc(false);
      setIsMultipleOc(false);
    }

    if (isMultipleOc || purchaseOrders == null) return;

    let indexPreSelecionado = 0;

    setSelectedOc(purchaseOrders.data[indexPreSelecionado]);

    setCodeOC(purchaseOrders.data[indexPreSelecionado].purchaseOrderNumber);
    setDateOC(
      new Date(
        purchaseOrders.data[indexPreSelecionado].purchaseOrderDate
      ).toLocaleDateString("pt-BR")
    );
    setSupplierOC(
      purchaseOrders.data[indexPreSelecionado].purchaseOrderSupplierName
    );
    setQuantityOC(purchaseOrders.data[indexPreSelecionado].orderQuantity);
  }, [codeOC, dateOC, supplierOC, QuantityOC, purchaseOrders, isMultipleOc]);

  const columns = [
    { field: "purchaseOrderNumber", header: "Ordem de compra" },
    { field: "purchaseOrderDate", header: "Data da OC" },
    { field: "purchaseOrderSupplierName", header: "Fornecedor" },
    { field: "orderQuantity", header: "Quantidade" },
  ];

  const formik = useFormik({
    initialValues: {
      product: "",
    },
    validationSchema: validatePurchaseOrderStep,
    validateOnChange: false,
    onSubmit: async (values) => {},
  });

  const handleNextStep = () => {
    formik.handleSubmit();

    const isFormValid =
      formik.isValid && Object.keys(formik.touched).length > 0;

    if (isFormValid) {
      props.setPurchaseOrderCallBack(selectedOc);
      props.nextStep();
    }
  };

  return (
    <StepLayout {...props} onNextStep={handleNextStep}>
      <RegisterPanelSimple>
        <MDBCol>
          <SelectWithFilter
            required
            label="Produto da OC"
            options={
              products &&
              products.data.map((product) => ({
                value: product.id,
                label: product.name,
              }))
            }
            value={formik.values.product}
            error={formik.errors.product}
            onChange={(e) => formik.setFieldValue("product", e.value)}
            width="500px"
          />
        </MDBCol>
      </RegisterPanelSimple>
      <label
        style={{
          fontFamily: "sans-serif",
          fontSize: "18px",
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
        {noOc ? (
          <div>
            <label>Sem ordem de compra para o produto informado.&nbsp;</label>
            <a href="/ordem-de-compra/cadastrar">
              Registrar uma ordem de compra.
            </a>
          </div>
        ) : (
          <div>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Código da OC:
            </label>
            {` ${codeOC}`}
            <b>&nbsp; - &nbsp;&nbsp;</b>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Data da OC:
            </label>
            {` ${dateOC}`}
            <b>&nbsp; - &nbsp;&nbsp;</b>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Fornecedor:
            </label>
            {` ${supplierOC}`}
            <b>&nbsp; - &nbsp;&nbsp;</b>
            <label style={{ fontSize: "15px", fontWeight: "700" }}>
              Quantidade de produto:
            </label>
            {` ${QuantityOC}`}
          </div>
        )}
      </div>
      {isMultipleOc && (
        <ViewPanel>
          <Datatable
            showCheckbox
            fromApi
            singleSelect
            setSelectedItens={onSelectOcRow}
            selectedItens={selectedOc}
            columns={columns}
            data={purchaseOrders}
          />
        </ViewPanel>
      )}
    </StepLayout>
  );
};

export default PurchaseOrderStep;
