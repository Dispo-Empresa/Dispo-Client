import { Accordion, AccordionTab } from "primereact/accordion";

import { StepLayout } from "../../../../components/structured/stepper/Stepper";
import { SaveButton } from "../../../../components/ui/buttons/icons/IconButton";
import { useState } from "react";

const ConfirmationStep = (props) => {
  const [productInfoJson, setProductInfoJson] = useState(null);
  const [batchesInfoJson, setBatchesInfoJson] = useState(null);

  const handleNextStep = () => {
    props.nextStep();
  };

  const onSave = () => {
    setProductInfoJson(props.productInfo);
    setBatchesInfoJson(props.batchesInfo);
  };

  var buttons = [<SaveButton onClick={onSave} />];

  return (
    <StepLayout {...props} onNextStep={handleNextStep} customButtons={buttons}>
      <Accordion activeIndex={0}>
        {props.batchesInfo &&
          props.batchesInfo.map((batchInfo) => (
            <AccordionTab header={`Lote: ${batchInfo.batch}`}>
              <b>Quantidade no lote:&nbsp;</b>
              <label>{batchInfo.quantityOnBatch}</label>
              <br />
              <br />
              <b>Data de validade:&nbsp;</b>
              <label>{batchInfo.validatingDate}</label>
            </AccordionTab>
          ))}
      </Accordion>
      <div>
        <br />
        <label>Informações do produto:</label>
        <br />
        <pre>{productInfoJson && JSON.stringify(productInfoJson, null, 2)}</pre>
        <br />
        <label>Informações sobre os lotes informados:</label>
        <br />
        <pre>{batchesInfoJson && JSON.stringify(batchesInfoJson, null, 2)}</pre>
      </div>
    </StepLayout>
  );
};

export default ConfirmationStep;
