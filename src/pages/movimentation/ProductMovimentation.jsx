import { useState } from "react";

import ContentPage from "layouts/content/ContentPage";
import MovementTypeStep from "./steps/MovementTypeStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import BatchesInfoStep from "./steps/BatchesInfoStep";
import { Stepper } from "components/structured/stepper/Stepper";
import { MovementType } from "utils/constants/enums";

function ProductMovimentation() {
  const stepLabels = [
    "Tipo de movimentação",
    "Informação dos lotes",
    "Confirmação",
  ];

  const [productInfo, setProductInfo] = useState(null);
  const [purchaseOrderSelected, setPurchaseOrderSelected] = useState(null);
  const [batchesRegistered, setBatchesRegistered] = useState(null);
  const [movementTypeSelected, setMovementTypeSelected] = useState(null);
  const [quantityForMovement, setQuantityForMovement] = useState(null);

  return (
    <ContentPage title="Movimentação de entrada de produto">
      <Stepper model="prime" steps={stepLabels}>
        <MovementTypeStep
          setMovementType={setMovementTypeSelected}
          setProductInfoCallBack={setProductInfo}
          setPurchaseOrderCallBack={setPurchaseOrderSelected}
          setQuantity={setQuantityForMovement}
          type={movementTypeSelected}
        />
        {productInfo && (
          <BatchesInfoStep
            productInfo={productInfo}
            setBatchesCallBack={setBatchesRegistered}
            type={movementTypeSelected}
            quantity={
              movementTypeSelected == MovementType.Input
                ? purchaseOrderSelected && purchaseOrderSelected.orderQuantity
                : quantityForMovement
            }
          />
        )}
        <ConfirmationStep
          purchaseOrderInfo={purchaseOrderSelected}
          batchesInfo={batchesRegistered}
          type={movementTypeSelected}
        />
      </Stepper>
    </ContentPage>
  );
}

export default ProductMovimentation;
