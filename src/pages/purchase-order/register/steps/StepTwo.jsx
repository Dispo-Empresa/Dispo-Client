import { MDBCol } from "mdb-react-ui-kit";
import React, { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useFormik } from "formik";

import { TextArea } from "../../../../components/ui/inputs/textarea/TextArea";
import { CurrencyField } from "../../../../components/ui/inputs/currency/CurrencyField";
import { StepLayout } from "../../../../components/structured/stepper/Stepper";
import { SelectWithFilter } from "../../../../components/ui/inputs/select/SelectField";
import RegisterPanelSimple from "../../../../layouts/panel/register/classic/RegisterPanelSimple";
import ViewPanel from "../../../../layouts/panel/view/ViewPanel";
import Datatable from "../../../../components/structured/datatable/Datatable";
import { NumberField } from "../../../../components/ui/inputs/number/NumberField";
import Button from "../../../../components/ui/buttons/classic/Button";
import useAlertScheme from "../../../../hooks/alert/useAlertScheme";

const products = [
  { value: "Laranja", label: "Laranja" },
  { value: "Carne", label: "Carne" },
  { value: "Batata", label: "Batata" },
  { value: "Coca-Cola", label: "Coca-Cola" },
];

const columns = [
  { field: "product", header: "Produto" },
  { field: "quantity", header: "Quantidade" },
  { field: "totalPurchaseValue", header: "Valor total" },
  { field: "shipping", header: "Frete" },
  { field: "deliveryTimeFrame", header: "Tempo de entrega" },
  { field: "description", header: "Descrição" },
];

function StepTwo(props) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAlert, openAlert] = useAlertScheme();
  const [orders, setOrders] = useState([]);

  const formik = useFormik({
    initialValues: {
      product: "",
      quantity: 0,
      totalPurchaseValue: 0,
      shipping: 0,
      deliveryTimeFrame: 0,
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
      product: formik.values.product,
      quantity: formik.values.quantity,
      totalPurchaseValue: formik.values.totalPurchaseValue,
      shipping: formik.values.shipping,
      deliveryTimeFrame: formik.values.deliveryTimeFrame,
      description: formik.values.description,
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
            options={products}
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
            value={formik.values.totalPurchaseValue}
            onChange={(value) => formik.setFieldValue("totalPurchaseValue", value.value)}
          />
        </MDBCol>
        <MDBCol>
          <CurrencyField
            required
            label="Frete"
            value={formik.values.shipping}
            onChange={(value) => formik.setFieldValue("shipping", value.value)}
          />
        </MDBCol>
        <MDBCol>
          <NumberField
            required
            label="Tempo de entrega"
            placeholder="Dias úteis"
            value={formik.values.deliveryTimeFrame}
            onChange={(value) => formik.setFieldValue("deliveryTimeFrame", value.value)
            }
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
