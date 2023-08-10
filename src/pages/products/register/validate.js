/* eslint-disable no-useless-escape */

const requiredFields = ["name", "salePrice", "category", "unitOfMeasurement", "description" ];

const validate = values => {
  const errors = {};

  requiredFields.forEach(field => {
    if (values[field] === null || values[field] === ""|| values[field] < 0) {
      errors[field] = "Campo obrigatório";
    }
  });

  return errors;
};

export default validate;