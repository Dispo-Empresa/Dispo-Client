/* eslint-disable react-hooks/exhaustive-deps */

import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";
import Datatable from "components/structured/datatable/Datatable";
import ViewPanel from "layouts/panel/view/ViewPanel";
import useAlertScheme from "hooks/alert/useAlertScheme";
import useFetch from "hooks/useFetchApi";
import Button from "components/ui/buttons/classic/Button";
import { StepLayout } from "components/structured/stepper/Stepper";
import { Datefield } from "components/ui/inputs/date/DateField";
import { NumberField } from "components/ui/inputs/number/NumberField";
import { validateBatchesStep } from "./validate";
import { ENDPOINTS } from "utils/constants/endpoints";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";

const BatchesInfoStep = (props) => {
  const columns = [
    { field: "batch", header: "Lote", minWidth: "350px" },
    { field: "validatingDate", header: "Data de validade" },
    { field: "quantityOnBatch", header: "Quantidade" },
  ];

  const { data: batches } = useFetch(
    ENDPOINTS.batches.getByProduct,
    props.productInfo.product
  );

  const formik = useFormik({
    initialValues: {
      batch: "",
      validatingDate: "",
      quantityOnBatch: "",
    },
    validationSchema: validateBatchesStep,
    validateOnChange: false,
  });

  useEffect(() => {
    if (!batches || batches.data.length < 1) return;

    const oldestBatch = batches.data.reduce((oldest, current) => {
      const currentDate = new Date();
      const currentExpirationDate = new Date(current.expirationDate);

      if (!oldest) return current;

      if (currentExpirationDate < currentDate) {
        return current;
      }

      return oldest;
    }, null);

    formik.setValues({
      batch: oldestBatch.id,
      validatingDate: new Date(oldestBatch.expirationDate),
      quantityOnBatch: oldestBatch.quantity,
    });
  }, [batches]);

  const [showAlert, openAlert] = useAlertScheme();
  const [batchesSelected, setBatchesSelected] = useState([]);
  const [quantityPerBatchTotal, setQuantityPerBatchTotal] = useState(0);

  const handleNextStep = () => {
    if (quantityPerBatchTotal === props.productInfo.quantityOnBatch) {
      openAlert(null);
      props.setBatchesInfoCallBack(batchesSelected);
      props.nextStep();
    } else {
      openAlert(
        "warning",
        "Aviso",
        "A quantidade de produtos informada na primeira etapa ainda não foi suprida!"
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
      batchesSelected &&
      batchesSelected.find((batch) => batch.batchId === formik.values.batch) !==
        undefined
    ) {
      openAlert("info", "Info", "O lote informado já foi inserido!");
    } else if (
      quantityPerBatchTotal + formik.values.quantityOnBatch >
      props.productInfo.quantityOnBatch
    ) {
      openAlert(
        "info",
        "Info",
        "A soma da quantidade de produtos em cada lote passa da quantidade da ordem de compra!"
      );
    } else {
      let batchSelected = batches.data.find(
        (batch) => batch.id === formik.values.batch
      );

      const newBatch = {
        batchId: formik.values.batch,
        batch: batchSelected.key,
        validatingDate:
          formik.values.validatingDate.toLocaleDateString("pt-BR"),
        quantityOnBatch: formik.values.quantityOnBatch,
      };

      setQuantityPerBatchTotal(
        quantityPerBatchTotal + newBatch.quantityOnBatch
      );

      openAlert(null);
      setBatchesSelected([...batchesSelected, newBatch]);
    }
  };

  const onSelectBatch = (e) => {
    formik.setFieldValue("batch", e.value);
    let batchSelected = batches.data.find((batch) => batch.id === e.value);
    formik.setFieldValue(
      "validatingDate",
      new Date(batchSelected.expirationDate)
    );
    formik.setFieldValue("quantityOnBatch", batchSelected.quantity);
  };

  const onDeleteRow = (rowToDelete) => {
    const updatedBatches = batchesSelected.filter((row) => row !== rowToDelete);
    const batchTeste = batchesSelected.find((row) => row === rowToDelete);

    setQuantityPerBatchTotal(
      quantityPerBatchTotal - batchTeste.quantityOnBatch
    );
    setBatchesSelected(updatedBatches);
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
      alertPanel={showAlert}
      customButtons={customButtons}
    >
      <RegisterPanelSimple>
        <MDBRow>
          <MDBCol md={6}>
            <SelectWithFilter
              required
              label="Lote"
              options={
                batches &&
                batches.data.map((selectedBatch) => ({
                  value: selectedBatch.id,
                  label: selectedBatch.key,
                }))
              }
              value={formik.values.batch}
              error={formik.errors.batch}
              width="500px"
              emptyMessage="Sem lotes encontrados para o produto informado"
              onChange={(e) => onSelectBatch(e)}
            />
          </MDBCol>
          <MDBCol md={3}>
            <Datefield
              disabled
              required
              hideIcon
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
        </MDBRow>
      </RegisterPanelSimple>
      {props.productInfo.quantityOnBatch - quantityPerBatchTotal ===
      0 ? null : (
        <div>
          <b style={{ fontSize: "15px", fontWeight: "600", color: "red" }}>
            Observação:
          </b>
          <label style={{ fontSize: "15px" }}>
            &nbsp; Faltam &nbsp;
            {props.productInfo.quantityOnBatch - quantityPerBatchTotal}&nbsp;
            produtos para atingir a quantidade requisitada
          </label>
        </div>
      )}
      <ViewPanel>
        <Datatable
          noDataMessage="Sem lotes no momento"
          fromApi={false}
          columns={columns}
          data={batchesSelected}
          onDeleteButton={onDeleteRow}
        />
      </ViewPanel>
    </StepLayout>
  );
};

export default BatchesInfoStep;
