import { useState } from "react";

import ContentPage from "layouts/content/ContentPage";
import MovementTypeStep from "../steps/MovementTypeStep";
import ConfirmationStep from "../steps/ConfirmationStep";
import ProductInfoStep from "../steps/ProductInfoStep";
import BatchesInfoStep from "../steps/BatchesInfoStep";
import { Stepper } from "components/structured/stepper/Stepper";

function ProductEntryMovimentation() {
  const stepLabels = [
    "Tipo de movimentação",
    "Produto",
    "Informação dos lotes",
    "Confirmação",
  ];

  const [productInfo, setProductInfo] = useState(null);
  const [purchaseOrderSelected, setPurchaseOrderSelected] = useState(null);
  const [batchesRegistered, setBatchesRegistered] = useState(null);
  const [movementTypeSelected, setMovementTypeSelected] = useState(null);

  return (
    <ContentPage title="Movimentação de entrada de produto">
      <Stepper model="prime" steps={stepLabels}>
        <MovementTypeStep setMovementType={setMovementTypeSelected} />
        <ProductInfoStep
          setProductInfoCallBack={setProductInfo}
          setPurchaseOrderCallBack={setPurchaseOrderSelected}
          type={movementTypeSelected}
        />
        {productInfo && (
          <BatchesInfoStep
            productInfo={productInfo}
            setBatchesCallBack={setBatchesRegistered}
            productsQuantityPurshaseOrder={
              purchaseOrderSelected && purchaseOrderSelected.orderQuantity
            }
            type={movementTypeSelected}
          />
        )}
        <ConfirmationStep
          purchaseOrderInfo={purchaseOrderSelected}
          batchesInfo={batchesRegistered}
        />
      </Stepper>
    </ContentPage>
  );
}

export default ProductEntryMovimentation;
