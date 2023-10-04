import * as Yup from "yup";

const productInfoStep = () => {
  return Yup.object().shape({
    product: Yup.string().required("Campo obrigatório"),
    quantityOnBatch: Yup.number().required("Campo obrigatório").positive("Informe uma quantidade válida").integer(),
  });
}

const validateBatchesStep = () => {
  return Yup.object().shape({
    quantityOnBatch: Yup.number().required("Campo obrigatório").positive("Informe uma quantidade válida").integer(),
  });
}

export { productInfoStep, validateBatchesStep };