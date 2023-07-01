const validate = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return validateName(value);
    case "salePrice":
      return validateSalePrice(value);
    case "category":
      return validateCategory(value);
    case "validateUnitOfMeasurement":
      return validateUnitOfMeasurement(value);
    default:
      return "";
  }
};

const validateName = (value) => {
  let error = "";
  if (value.length < 3) {
    error = "O Nome do produto deve ter mais de 2 caractéres.";
  }

  return error;
};

const validateSalePrice = (value) => {
  let error = "";
  if (value === 0.0) {
    error = "Valor de venda deve ser maior que zero.";
  }

  return error;
};

const validateCategory = (value) => {
  let error = "";
  if (value === undefined) {
    error = "A categoria deve ser selecionada.";
  }

  return error;
};

const validateUnitOfMeasurement = (value) => {
  let error = "";
  if (value === undefined) {
    error = "A Unidade de peso deve ser selecionada.";
  }

  return error;
};

export default validate;
