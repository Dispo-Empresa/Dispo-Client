import { Accordion, AccordionTab } from "primereact/accordion";

import { StepLayout } from "components/structured/stepper/Stepper";
import { SaveButton } from "components/ui/buttons/icons/IconButton";
import { useState } from "react";

const ConfirmationStep = (props) => {
  const [purchaseOrderInfoJson, setPurchaseOrderInfoJson] = useState(null);
  const [batchesInfoJson, setBatchesInfoJson] = useState(null);

  const handleNextStep = () => {
    props.nextStep();
  };

  const onSave = () => {
    setPurchaseOrderInfoJson(props.purchaseOrderInfo);
    setBatchesInfoJson(props.batchesInfo);
  };

  var buttons = [<SaveButton onClick={onSave} />];

  return (
    <StepLayout {...props} onNextStep={handleNextStep} customButtons={buttons}>
      <Accordion activeIndex={0}>
        {props.batchesInfo &&
          props.batchesInfo.map((batchInfo) => (
            <AccordionTab header={`Código: ${batchInfo.batch}`}>
              <b>Quantidade no lote:&nbsp;</b>
              <label>{batchInfo.quantityOnBatch}</label>
              <br />
              <br />
              <b>Data de fabricação:&nbsp;</b>
              <label>{batchInfo.manufacturingDate}</label>
              <br />
              <br />
              <b>Data de validade:&nbsp;</b>
              <label>{batchInfo.validatingDate}</label>
            </AccordionTab>
          ))}
      </Accordion>
      <div>
        <br />
        <label>Informações da ordem de compra:</label>
        <br />
        <pre>
          {purchaseOrderInfoJson &&
            JSON.stringify(purchaseOrderInfoJson, null, 2)}
        </pre>
        <br />
        <label>Informações sobre os lotes informados:</label>
        <br />
        <pre>{batchesInfoJson && JSON.stringify(batchesInfoJson, null, 2)}</pre>
      </div>
    </StepLayout>
  );
};

export default ConfirmationStep;
