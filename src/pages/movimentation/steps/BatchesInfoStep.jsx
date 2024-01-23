import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanelSimple from "layouts/panel/register/classic/RegisterPanelSimple";
import Datatable from "components/structured/datatable/Datatable";
import ViewPanel from "layouts/panel/view/ViewPanel";
import Button from "components/ui/buttons/classic/Button";
import useAlertScheme from "hooks/alert/useAlertScheme";
import useFetch from "hooks/useFetchApi";
import InfoIcon from "@mui/icons-material/Info";
import { StepLayout } from "components/structured/stepper/Stepper";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { Datefield } from "components/ui/inputs/date/DateField";
import { NumberField } from "components/ui/inputs/number/NumberField";
import { validateBatchesStep } from "./validate";
import { ENDPOINTS } from "utils/constants/endpoints";
import { SelectWithFilter } from "components/ui/inputs/select/SelectField";
import { MovementType } from "utils/constants/enums";

const BatchesInfoStep = (props) => {
  const { data: batchesOptions } = useFetch(
    ENDPOINTS.batches.getByProduct,
    props.productInfo.product
  );

  const [showAlert, openAlert] = useAlertScheme();
  const [batches, setBatches] = useState([]);
  const [quantityPerBatchTotal, setQuantityPerBatchTotal] = useState(0);
  const [showInfoBatch, setShowInfoBatch] = useState(false);

  const columns = [
    { field: "batch", header: "Lote" },
    { field: "manufacturingDate", header: "Data de fabricação" },
    { field: "validatingDate", header: "Data de validade" },
    { field: "quantityOnBatch", header: "Quantidade" },
  ];

  const formik = useFormik({
    initialValues: {
      batch: "",
      manufacturingDate: props.type == MovementType.Input && new Date(),
      validatingDate: props.type == MovementType.Input && new Date(),
      quantityOnBatch: 0,
    },
    validationSchema: validateBatchesStep,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (batches.find((batch) => batch.batch === values.batch) !== undefined) {
        openAlert("info", "Info", "Já existe o lote informado!");
      } else if (
        quantityPerBatchTotal + values.quantityOnBatch >
        props.quantity
      ) {
        openAlert(
          "warning",
          "Aviso",
          "A soma da quantidade de produtos em cada lote passa da quantidade da ordem de compra!"
        );
      } else if (
        props.type == MovementType.Output &&
        values.quantityOnBatch >
          batchesOptions.data.find((batch) => batch.id == values.batch).quantity
      ) {
        openAlert(
          "warning",
          "Aviso",
          "Quantidade não disponível no lote selecionado!"
        );
      } else {
        const newBatch = {
          batch:
            props.type == MovementType.Input
              ? values.batch
              : batchesOptions.data.filter(
                  (batch) => batch.id === values.batch
                )[0].key,
          batchId:
            props.type == MovementType.Output
              ? batchesOptions.data.filter(
                  (batch) => batch.id === values.batch
                )[0].id
              : -1,
          manufacturingDate: values.manufacturingDate.toDateString(),
          validatingDate: values.validatingDate.toDateString(),
          quantityOnBatch: values.quantityOnBatch,
        };

        setQuantityPerBatchTotal(
          quantityPerBatchTotal + newBatch.quantityOnBatch
        );

        openAlert(null);
        setBatches([...batches, newBatch]);
      }

      setShowInfoBatch();
      formik.resetForm();
    },
  });

  const handleNextStep = () => {
    if (quantityPerBatchTotal === props.quantity) {
      props.setBatchesCallBack(batches);
      openAlert(null);
      props.nextStep();
    } else {
      openAlert(
        "warning",
        "Aviso",
        props.type == MovementType.Input
          ? "A quantidade da ordem de compra ainda não foi suprida!"
          : "A quantidade informada para retirada de produtos ainda não foi suprida!"
      );
    }
  };

  const handleInsertBatch = () => {
    formik.handleSubmit();
  };

  const handleDeleteRow = (rowToDelete) => {
    const updatedBatches = batches.filter((row) => row !== rowToDelete);
    const batch = batches.find((row) => row === rowToDelete);

    setQuantityPerBatchTotal(quantityPerBatchTotal - batch.quantityOnBatch);
    setBatches(updatedBatches);
  };

  const handleSelectBatch = (e) => {
    setShowInfoBatch(false);
    formik.setFieldValue("batch", e.value);
    let batchSelected = batchesOptions.data.filter(
      (batch) => batch.id === e.value
    )[0];

    formik.setFieldValue(
      "manufacturingDate",
      new Date(batchSelected.manufacturingDate)
    );
    formik.setFieldValue(
      "validatingDate",
      new Date(batchSelected.expirationDate)
    );
    formik.setFieldValue("quantityOnBatch", batchSelected.quantity);
  };

  useEffect(() => {
    if (
      props.type == MovementType.Input ||
      (props.type == MovementType.Output && !batchesOptions)
    ) {
      return;
    }

    const oldestBatch = batchesOptions.data.reduce((oldest, current) => {
      const currentDate = new Date();
      const currentExpirationDate = new Date(current.expirationDate);

      if (!oldest) return current;

      if (currentExpirationDate < currentDate) {
        return current;
      }

      return oldest;
    }, null);

    setShowInfoBatch(true);

    formik.setValues({
      batch: oldestBatch.id,
      manufacturingDate: new Date(oldestBatch.manufacturingDate),
      validatingDate: new Date(oldestBatch.expirationDate),
      quantityOnBatch: oldestBatch.quantity,
    });
  }, [batches, batchesOptions]);

  var customButtons = [
    <Button
      title={
        props.type == MovementType.Input ? "Inserir Lote" : "Retirar do lote"
      }
      height="40px"
      onClick={handleInsertBatch}
      icon={<AddIcon />}
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
          {props.type == MovementType.Input ? (
            <TextField
              required
              label="Lote"
              value={formik.values.batch}
              error={formik.errors.batch}
              onChange={(e) => formik.setFieldValue("batch", e.target.value)}
            />
          ) : (
            <div>
              <SelectWithFilter
                required
                label="Lote"
                options={
                  batchesOptions &&
                  batchesOptions.data.map((selectedBatch) => ({
                    value: selectedBatch.id,
                    label: `${selectedBatch.key} - ${selectedBatch.quantity} produtos`,
                  }))
                }
                value={formik.values.batch}
                error={formik.errors.batch}
                width="500px"
                emptyMessage="Sem lotes encontrados para o produto informado"
                onChange={(e) => handleSelectBatch(e)}
              />
              {showInfoBatch && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#1677FF",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                >
                  <InfoIcon style={{ marginRight: "8px" }} fontSize="7" />
                  <label>
                    O lote foi selecionado automáticamente pela data de validade
                  </label>
                </div>
              )}
            </div>
          )}
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            disabled={props.type == MovementType.Output}
            label="Data de fabricação"
            value={formik.values.manufacturingDate}
            error={formik.errors.manufacturingDate}
            onChange={(e) => formik.setFieldValue("manufacturingDate", e.value)}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            disabled={props.type == MovementType.Output}
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
          {props.quantity - quantityPerBatchTotal > 0 && (
            <label
              style={{
                fontSize: "14px",
                color: "#FAAD14",
                fontWeight: "600",
              }}
            >
              Restam {props.quantity - quantityPerBatchTotal} produtos
            </label>
          )}
        </MDBCol>
      </RegisterPanelSimple>
      {batches.length > 0 && (
        <ViewPanel>
          <Datatable
            noDataMessage="Sem lotes no momento"
            columns={columns}
            data={batches}
            fromApi={false}
            onDeleteButton={handleDeleteRow}
          />
        </ViewPanel>
      )}
    </StepLayout>
  );
};

export default BatchesInfoStep;
