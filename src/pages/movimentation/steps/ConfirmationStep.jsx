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
        key: batch.batch,
        manufacturingDate: new Date(batch.manufacturingDate),
        expirationDate: new Date(batch.validatingDate),
        quantity: batch.quantityOnBatch,
        orderId: props.purchaseOrderInfo.idOrder,
      }));

    var request = {
      batches: batchesInfoRequest,
      movementType: MovementType.Input,
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
      customButtons={buttons}
      alertPanel={showAlert}
    >
      <Accordion activeIndex={0}>
        {props.batchesInfo &&
          props.batchesInfo.map((batchInfo) => (
            <AccordionTab header={`Código: ${batchInfo.batch}`}>
              <b>Quantidade no lote:&nbsp;</b>
              <label>{batchInfo.quantityOnBatch}</label>
              <br />
              <br />
              <b>Data de fabricação:&nbsp;</b>
              <label>
                {new Date(batchInfo.manufacturingDate).toLocaleDateString(
                  "pt-BR"
                )}
              </label>
              <br />
              <br />
              <b>Data de validade:&nbsp;</b>
              <label>
                {new Date(batchInfo.validatingDate).toLocaleDateString("pt-BR")}
              </label>
            </AccordionTab>
          ))}
      </Accordion>
    </StepLayout>
  );
};

export default ConfirmationStep;
