import { useState } from "react";

import ContentPage from "../../../layouts/content/ContentPage";
import PurchaseOrderStep from "./steps/PurchaseOrderStep";
import BatchesInfoStep from "./steps/BatchesInfoStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { Stepper } from "../../../components/structured/stepper/Stepper";

function ProductEntryMovimentation() {
  const stepLabels = ["Ordem de compra", "Informação dos lotes", "Confirmação"];

  const [purchaseOrderSelected, setPurchaseOrderSelected] = useState(null);
  const [batchesRegistered, setBatchesRegistered] = useState(null);

  return (
    <ContentPage title="Movimentação de entrada de produto">
      <Stepper model="prime" steps={stepLabels}>
        <PurchaseOrderStep
          setPurchaseOrderCallBack={setPurchaseOrderSelected}
        />
        <BatchesInfoStep
          setBatchesCallBack={setBatchesRegistered}
          productsQuantityPurshaseOrder={
            purchaseOrderSelected && purchaseOrderSelected.orderQuantity
          }
        />
        <ConfirmationStep
          purchaseOrderInfo={purchaseOrderSelected}
          batchesInfo={batchesRegistered}
        />
      </Stepper>
    </ContentPage>
  );
}

export default ProductEntryMovimentation;
