import { useState } from "react";

import ContentPage from "layouts/content/ContentPage";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import { Stepper } from "components/structured/stepper/Stepper";

function PurchaseOrder() {
  const steps = [
    "Informações da ordem de compra",
    "Informações do pedido",
    "Confirmação",
  ];

  const [purchaseOrderInfo, setPurchaseOrderInfo] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  return (
    <ContentPage title="Ordem de compra">
      <Stepper steps={steps}>
        <StepOne setPurchaseOrderInfoCallBack={setPurchaseOrderInfo} />
        <StepTwo setOrderInfoCallBack={setOrderInfo} />
        <StepThree
          purchaseOrderInfo={purchaseOrderInfo}
          orderInfo={orderInfo}
        />
      </Stepper>
    </ContentPage>
  );
}

export default PurchaseOrder;
