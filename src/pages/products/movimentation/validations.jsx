const validate = (fieldName, value) => {
  switch (fieldName) {
    case "product":
      return validateProduct(value);
    case "quantity":
      return validateQuantity(value);
    case "movimentationType":
      return validateMovimentationType(value);
    default:
      return "";
  }
};

const validateProduct = (value) => {
  let error = "";
  if (value === undefined || value <= 0) {
    error = "O produto deve ser selecionado.";
  }

  return error;
};

const validateQuantity = (value) => {
  let error = "";
  if (value <= 0) {
    error = "A quantidade deve ser maior que zero.";
  }

  return error;
};

const validateMovimentationType = (value) => {
  let error = "";
  if (value === undefined || (value < 0 && value > 1)) {
    error = "O tipo de movimentação deve ser selecionado.";
  }

  return error;
};

export default validate;
