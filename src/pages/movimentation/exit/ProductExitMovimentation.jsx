import { useState } from "react";

import ContentPage from "../../../layouts/content/ContentPage";
import Stepper from "../../../components/structured/stepper/StepperX";
import PurchaseOrderStep from "./steps/PurchaseOrderStep";
import BatchesInfoStep from "./steps/BatchesInfoStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import {
  PurchaseOrderStepValidations,
  BatchesInfoStepValidations,
} from "./steps/validate";

function ProductEntryMovimentation() {
  const stepLabels = [
    { label: "Ordem de compra" },
    { label: "Informação dos lotes" },
    { label: "Confirmação" },
  ];

  const [showAlert, openAlert] = useAlertScheme();

  const steps = [
    {
      component: PurchaseOrderStep,
      validationSchema: PurchaseOrderStepValidations,
    },
    {
      component: BatchesInfoStep,
      validationSchema: BatchesInfoStepValidations,
    },
    {
      component: ConfirmationStep,
    },
  ];

  // com esse step n é possivel transitar as informaçoes de um step para o outro, no max os valores dos campos,
  // talvez o objetivo dele é algo mais simples, como um cadastro simples

  // vamos usar o multistep antigo para esse cara e colocar o padrão de registro em cada step unitariamente para testar

  const [finalValues, setFinalValues] = useState({});

  const initialValues = {
    product: "",
    batch: "",
    manufacturingDate: new Date(),
    validatingDate: new Date(),
    quantityOnBatch: "",
    batches: [],
  };

  const register = () => {
    console.log(finalValues);
    openAlert("info", "Testando mensagem de informação");
  };

  return (
    <ContentPage title="Movimentação de produto">
      <Stepper
        labels={stepLabels}
        steps={steps}
        initialValues={initialValues}
        alertPanel={showAlert}
        onSave={register}
        setValues={setFinalValues}
      />
    </ContentPage>
  );
}

export default ProductEntryMovimentation;
