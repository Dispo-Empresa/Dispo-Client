import * as Yup from "yup";

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

export { validatePurchaseOrderStep, validateBatchesStep };