import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useFormik } from "formik";

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { TextArea } from "../../../../components/ui/inputs/textarea/TextArea";
import { CurrencyField } from "../../../../components/ui/inputs/currency/CurrencyField";
import { StepLayout } from "../../../../components/structured/stepper/Stepper";
import { SelectWithFilter } from "../../../../components/ui/inputs/select/SelectField";
import { ENDPOINTS } from "../../../../utils/constants/endpoints";
import { NumberField } from "../../../../components/ui/inputs/number/NumberField";
import useFetch from "../../../../hooks/useFetchApi";

import RegisterPanelSimple from "../../../../layouts/panel/register/classic/RegisterPanelSimple";
import ViewPanel from "../../../../layouts/panel/view/ViewPanel";
import Datatable from "../../../../components/structured/datatable/Datatable";
import Button from "../../../../components/ui/buttons/classic/Button";
import useAlertScheme from "../../../../hooks/alert/useAlertScheme";

function StepTwo(props) {
  const { data: products } = useFetch(ENDPOINTS.products.getProductNames);

  console.log("Produto:")
  console.log(products)

  /*const products = [
    { value: "Laranja", label: "Laranja" },
    { value: "Carne", label: "Carne" },
    { value: "Batata", label: "Batata" },
    { value: "Coca-Cola", label: "Coca-Cola" },
  ];*/
  
  const columns = [
    { field: "product", header: "Produto" },
    { field: "quantity", header: "Quantidade" },
    { field: "totalPrice", header: "Valor total" },
    { field: "description", header: "Descrição" },
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAlert, openAlert] = useAlertScheme();
  const [orders, setOrders] = useState([]);

  const formik = useFormik({
    initialValues: {
      product: "",
      quantity: null,
      totalPrice: 0,
      description: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {},
  });

  const deleteRows = (rowToDelete) => {
    const newOrder = orders.filter((row) => row !== rowToDelete);

    setOrders(newOrder);
  };

  const handleNextStep = () => {
    formik.handleSubmit();

    const isFormValid = formik.isValid && Object.keys(formik.touched).length > 0;

    if (isFormValid) {
      props.setOrderInfoCallBack(orders);
      props.nextStep();
    }
  };

  const onInsertOrder = () => {
    if (
      orders.find((order) => order.product === formik.values.product) !==
      undefined
    ) {
      openAlert("warning", "Esse produto já está inserido na ordem de compra.");
      return;
    }
    console.log(formik);

    const newOrder = {
      description: formik.values.description,
      quantity: formik.values.quantity,
      totalPrice: formik.values.totalPrice,
      product: formik.values.product
    };
    setOrders([...orders, newOrder]);

    openAlert(null);
  };

  var customButtons = [
    <Button
      title="Inserir pedido"
      width="150px"
      height="40px"
      onClick={onInsertOrder}
      icon={<KeyboardDoubleArrowDownIcon />}
    />,
  ];

  return (
    <StepLayout
      {...props}
      onNextStep={handleNextStep}
      customButtons={customButtons}
      alertPanel={showAlert}
    >
      <RegisterPanelSimple>
        <MDBCol>
          <SelectWithFilter
            required
            label="Produto"
            options={
              products &&
              products.data.map((product) => ({
                value: product.id,
                label: product.name,
              }))
            }
            value={formik.values.product}
            onChange={(value) => formik.setFieldValue("product", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <NumberField
            required
            label="Quantidade"
            value={formik.values.quantity}
            onChange={(value) => formik.setFieldValue("quantity", value.value)}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            required
            label="Valor total"
            value={formik.values.totalPrice}
            onChange={(value) => formik.setFieldValue("totalPrice", value.value)}
          />
        </MDBCol>
        <TextArea
          label="Descrição"
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue("description", value.target.value)
          }
        />
      </RegisterPanelSimple>
      <ViewPanel>
        <Datatable
          columns={columns}
          data={orders}
          fromApi={false}
          noDataMessage="Nenhum pedido cadastrado"
          rowsPerPage={[5, 10, 15]}
          setSelectedItens={setSelectedOrder}
          selectedItens={selectedOrder}
          onDeleteButton={deleteRows}
        />
      </ViewPanel>
    </StepLayout>
  );
}

export default StepTwo;
