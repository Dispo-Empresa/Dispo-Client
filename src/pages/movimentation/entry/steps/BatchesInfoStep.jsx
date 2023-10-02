import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useState } from "react";
import { useFormik } from "formik";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

import RegisterPanelSimple from "../../../../layouts/panel/register/classic/RegisterPanelSimple";
import Datatable from "../../../../components/structured/datatable/Datatable";
import ViewPanel from "../../../../layouts/panel/view/ViewPanel";
import Button from "../../../../components/ui/buttons/classic/Button";
import useAlertScheme from "../../../../hooks/alert/useAlertScheme";
import { StepLayout } from "../../../../components/structured/stepper/Stepper";
import { TextField } from "../../../../components/ui/inputs/textfield/TextField";
import { Datefield } from "../../../../components/ui/inputs/date/DateField";
import { NumberField } from "../../../../components/ui/inputs/number/NumberField";
import { validateBatchesStep } from "./validate";

const BatchesInfoStep = (props) => {
  const columns = [
    { field: "batch", header: "Lote", minWidth: "350px" },
    { field: "manufacturingDate", header: "Data de fabricação" },
    { field: "validatingDate", header: "Data de validade" },
    { field: "quantityOnBatch", header: "Quantidade" },
  ];

  const [showAlert, openAlert] = useAlertScheme();
  const [batches, setBatches] = useState([]);
  const [quantityPerBatchTotal, setQuantityPerBatchTotal] = useState(0);

  const formik = useFormik({
    initialValues: {
      batch: "",
      manufacturingDate: new Date(),
      validatingDate: new Date(),
      quantityOnBatch: 0,
    },
    validationSchema: validateBatchesStep,
    validateOnChange: false,
    onSubmit: async (values) => {},
  });

  const handleNextStep = () => {
    if (quantityPerBatchTotal === props.productsQuantityPurshaseOrder) {
      props.setBatchesCallBack(batches);
      openAlert(null);
      props.nextStep();
    } else {
      openAlert(
        "warning",
        "Aviso",
        "A quantidade da ordem de compra ainda não foi suprida!"
      );
    }
  };

  const onInsertBatch = () => {
    formik.handleSubmit();

    const isFormValid =
      formik.isValid && Object.keys(formik.touched).length > 0;

    if (!isFormValid) {
      return;
    }

    if (
      batches.find((batch) => batch.batch === formik.values.batch) !== undefined
    ) {
      openAlert("info", "Info", "Já existe o lote informado!");
    } else if (
      quantityPerBatchTotal + formik.values.quantityOnBatch >
      props.productsQuantityPurshaseOrder
    ) {
      openAlert(
        "info",
        "Info",
        "A soma da quantidade de produtos em cada lote passa da quantidade da ordem de compra!"
      );
    } else {
      const newBatch = {
        batch: formik.values.batch,
        manufacturingDate:
          formik.values.manufacturingDate.toLocaleDateString("pt-BR"),
        validatingDate:
          formik.values.validatingDate.toLocaleDateString("pt-BR"),
        quantityOnBatch: formik.values.quantityOnBatch,
      };

      setQuantityPerBatchTotal(
        quantityPerBatchTotal + newBatch.quantityOnBatch
      );

      openAlert(null);
      setBatches([...batches, newBatch]);
    }
  };

  const onDeleteRow = (rowToDelete) => {
    const updatedBatches = batches.filter((row) => row !== rowToDelete);
    const batch = batches.find((row) => row === rowToDelete);

    setQuantityPerBatchTotal(quantityPerBatchTotal - batch.quantityOnBatch);
    setBatches(updatedBatches);
  };

  var customButtons = [
    <Button
      title="Inserir Lote"
      width="150px"
      height="40px"
      onClick={onInsertBatch}
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
          <TextField
            required
            label="Lote"
            value={formik.values.batch}
            error={formik.errors.batch}
            onChange={(e) => formik.setFieldValue("batch", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            label="Data de fabricação"
            value={formik.values.manufacturingDate}
            error={formik.errors.manufacturingDate}
            onChange={(e) => formik.setFieldValue("manufacturingDate", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            label="Data de validade"
            value={formik.values.validatingDate}
            error={formik.errors.validatingDate}
            onChange={(e) => formik.setFieldValue("validatingDate", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <NumberField
            required
            label="Quantidade"
            value={formik.values.quantityOnBatch}
            error={formik.errors.quantityOnBatch}
            onChange={(e) => formik.setFieldValue("quantityOnBatch", e.value)}
          />
        </MDBCol>
      </RegisterPanelSimple>
      {props.productsQuantityPurshaseOrder - quantityPerBatchTotal ===
      0 ? null : (
        <div>
          <b style={{ fontSize: "15px", fontWeight: "600", color: "red" }}>
            Observação:
          </b>
          <label style={{ fontSize: "15px" }}>
            &nbsp; Faltam{" "}
            {props.productsQuantityPurshaseOrder - quantityPerBatchTotal}{" "}
            produtos para atingir a quantidade da OC
          </label>
        </div>
      )}
      <ViewPanel>
        <Datatable
          noDataMessage="Sem lotes no momento"
          columns={columns}
          data={batches}
          fromApi={false}
          onDeleteButton={onDeleteRow}
        />
      </ViewPanel>
    </StepLayout>
  );
};

export default BatchesInfoStep;
