import * as Yup from "yup";

import { MovementType } from "utils/constants/enums";

const validateMovementTypeStep = () => {
  return Yup.object().shape({
    type: Yup.string().required("Campo obrigatório"),
    date: Yup.date().required("Campo obrigatório"),
    product: Yup.number().when("type", {
      is: (type) => type != null,
      then: (schema) => schema.required("Campo obrigatório"),
      otherwise: (schema) => schema.notRequired()
    }),
    quantity: Yup.number().when(['product', 'type'], {
      is: (product, type) => product != null && type == MovementType.Output,
      then: (schema) => schema.required("Campo obrigatório").positive("Informe uma quantidade válida").integer(),
      otherwise: (schema) => schema.notRequired()
    }),
    unitPrice: Yup.number().required("Campo obrigatório").min(0.01, "O valor deve ser maior que zero")
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

export { validateMovementTypeStep, validatePurchaseOrderStep, validateBatchesStep };