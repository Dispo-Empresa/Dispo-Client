import * as Yup from "yup";

const PurchaseOrderStepValidations = () => {
  return Yup.object().shape({
    orderNumber: Yup.string().required("Campo obrigatório"),
    supplier: Yup.string().required("Campo obrigatório"),
    creationDate: Yup.string().required("Campo obrigatório"),
    notificationType: Yup.string().required("Campo obrigatório")
  });
}

const OrderInfoStepValidations = () => {
  return Yup.object().shape({
    //batch: Yup.string().required("Informe o lote"),
    //quantityOnBatch: Yup.number().required("Informe a quantidade").positive("Informe uma quantidade válida").integer()
  });
}


export { PurchaseOrderStepValidations, OrderInfoStepValidations };