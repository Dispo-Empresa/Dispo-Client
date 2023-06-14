const validateProduct = (value) => {
  let error = "";
  console.log("product", value);
  if (value <= 0) {
    error = "O produto deve ser selecionado.";
  }

  return error;
};

const validateWarehouse = (value) => {
  let error = "";
  if (value <= 0) {
    error = "O depósito deve ser selecionado.";
  }

  return error;
};

const validateQuantity = (value) => {
  let error = "";
  if (isNaN(value)) {
    error = "A quantidade deve ser um número.";
  }

  if (value <= 0) {
    error = "A quantidade deve ser maior que zero.";
  }

  return error;
};

const validateMovimentationType = (value) => {
  let error = "";
  if (value < 0 && value > 1) {
    error = "O tipo de movimentação deve ser selecionado.";
  }

  return error;
};

export {
  validateProduct,
  validateWarehouse,
  validateQuantity,
  validateMovimentationType,
};
