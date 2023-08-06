import React, { useState } from 'react';

import ContentPage from "../../../layouts/content/ContentPage";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import { Stepper } from "../../../components/structured/stepper/Stepper";

function PurchaseOrder(){
  const steps = ["Informações da ordem de compra", "Informações do pedido", "Confirmação"];

  const [showAlert, openAlert] = useAlertScheme();
  const [order, setPurchaseOrder] = useState([]);
  const [purchaseOne, setPurchaseOne] = useState({});
  const [purchaseTwo, setPurchaseTwo] = useState([]);

  const handleStepChange = () => {
    var data = {
      orderNumber:        purchaseOne.orderNumber,
      creationDate:       purchaseOne.creationDate,
      notificationType:   purchaseOne.notificationType,
      supplier:           purchaseOne.supplier
    };

    setPurchaseOrder(data);
  }

  const assignPuchaseOne = (val) => {
    setPurchaseOne((purchase) => ({
      ...purchase,
      ...val,
    }));
  };

  const assignPuchaseTwo = (val) => {
    setPurchaseTwo(val);
  };

  const RegisterPurchaseOrder = () => {
    openAlert(
      "success",
      "Testando Multistep no cadastro de ordem de compra",
      "Ordem de compra realizada com sucesso!"
    );
  };

  return (
    <ContentPage title="Ordem de compra">
      <Stepper
        steps={steps}
        alertPanel={showAlert}
        onSave={RegisterPurchaseOrder}
        onStepChange={handleStepChange}
      >
         <StepOne entityCallback={assignPuchaseOne} alertPanel={openAlert} />
         <StepTwo entityCallback={assignPuchaseTwo} alertPanel={openAlert} />
         <StepThree entity={order} order={purchaseTwo}/>
      </Stepper>
    </ContentPage>
  );
}

export default PurchaseOrder;
