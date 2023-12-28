import { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

import useAlertScheme from "hooks/alert/useAlertScheme";
import { StepLayout } from "components/structured/stepper/Stepper";
import { SaveButton } from "components/ui/buttons/icons/IconButton";
import { post } from "services/httpMethods";
import { ENDPOINTS } from "utils/constants/endpoints";
import { MovementType } from "utils/constants/enums";

const ConfirmationStep = (props) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, openAlert] = useAlertScheme();

  const handleNextStep = () => {
    props.nextStep();
  };

  const onSave = async () => {
    setLoading(true);

    var batchesInfoRequest =
      props.batchesInfo &&
      props.batchesInfo.map((batch) => ({
        id: batch.batchId,
        key: batch.batch,
        expirationDate: new Date(batch.validatingDate),
        quantity: batch.quantityOnBatch,
        productId: props.productInfo.product,
      }));

    var request = {
      batches: batchesInfoRequest,
      movementType: MovementType.Output,
    };
    var response = await post(ENDPOINTS.movements.moveProduct, request);

    if (response.success) {
      openAlert(response.alertType, response.message);
    } else {
      openAlert(response.alertType, "Erro", response.message);
    }

    setLoading(false);
  };

  var buttons = [<SaveButton onClick={onSave} loading={loading} />];

  return (
    <StepLayout
      {...props}
      onNextStep={handleNextStep}
      alertPanel={showAlert}
      customButtons={buttons}
    >
      <Accordion activeIndex={0}>
        {props.batchesInfo &&
          props.batchesInfo.map((batchInfo) => (
            <AccordionTab header={`Lote: ${batchInfo.batch}`}>
              <b>Quantidade no lote:&nbsp;</b>
              {new Date(batchInfo.manufacturingDate).toLocaleDateString(
                "pt-BR"
              )}
              <br />
              <br />
              <b>Data de validade:&nbsp;</b>
              <label>{batchInfo.validatingDate}</label>
            </AccordionTab>
          ))}
      </Accordion>
    </StepLayout>
  );
};

export default ConfirmationStep;
