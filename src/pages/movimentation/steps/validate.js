import * as Yup from "yup";

const validateMovementTypeStep = () => {
  return Yup.object().shape({
    type: Yup.string().required("Campo obrigatório"),
    quantity: Yup.number().required("Campo obrigatório").positive("Informe uma quantidade válida").integer(),
    date: Yup.date().required("Campo obrigatório")
  });
}

const validateProductInfoStep = () => {
  return Yup.object().shape({
    product: Yup.string().required("Campo obrigatório"),
    unitPrice: Yup.number()
    .required("Campo obrigatório")
    .min(0.01, "O valor deve ser maior que zero")
  });
}

const validatePurchaseOrderStep = () => {
  return Yup.object().shape({
    product: Yup.string().required("Campo obrigatório"),
  });
};

const validateBatchesStep = () => {
  return Yup.object().shape({
    batch: Yup.string().required("Campo obrigatório"),
    quantityOnBatch: Yup.number().required("Campo obrigatório").positive("Informe uma quantidade válida").integer(),
    manufacturingDate: Yup.date().required("Campo obrigatório").max(new Date(), "A data de fabricação não pode ser maior que a data atual").when("validatingDate", (validatingDate, schema) => {
      return schema.max(validatingDate, "A data de fabricação não pode ser maior que a data de validade")
    }),
    validatingDate: Yup.date().required("Campo obrigatório"),
  });
}

export { validateMovementTypeStep, validateProductInfoStep, validatePurchaseOrderStep, validateBatchesStep };