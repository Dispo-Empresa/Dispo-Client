import * as Yup from "yup";

const PurchaseOrderStepValidations = () => {
  return Yup.object().shape({
    product: Yup.string().required("Escolha o produto")
  });
}

const BatchesInfoStepValidations = () => {
  return Yup.object().shape({
    //batch: Yup.string().required("Informe o lote"),
    //quantityOnBatch: Yup.number().required("Informe a quantidade").positive("Informe uma quantidade válida").integer()
  });
}


export { PurchaseOrderStepValidations, BatchesInfoStepValidations };