import { useState } from "react";

import ContentPage from "../../../layouts/content/ContentPage";
import ProductInfoStep from "./steps/ProductInfoStep";
import BatchesInfoStep from "./steps/BatchesInfoStep";
import ConfirmationStep from "./steps/ConfirmationStep";
import { Stepper } from "../../../components/structured/stepper/Stepper";

function ProductExitMovimentation() {
  const stepLabels = [
    "Informação do produto",
    "Informação dos lotes",
    "Confirmação",
  ];

  const [productInfo, setProductInfo] = useState(null);
  const [batchesInfo, setBatchesInfo] = useState([]);

  return (
    <ContentPage title="Movimentação de saída de produto">
      <Stepper model="prime" steps={stepLabels}>
        <ProductInfoStep setProductInfoCallBack={setProductInfo} />
        {productInfo && (
          <BatchesInfoStep
            productInfo={productInfo}
            setBatchesInfoCallBack={setBatchesInfo}
          />
        )}
        <ConfirmationStep productInfo={productInfo} batchesInfo={batchesInfo} />
      </Stepper>
    </ContentPage>
  );
}

export default ProductExitMovimentation;
