/* eslint-disable no-useless-escape */

const validate = (fieldName, value) => {
  switch (fieldName) {
    case "email":
      return validateEmail(value);
    default:
      return "";
  }
};

const validateEmail = (value) => {
  let error = "";
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(value)) {
    error = "Email inválido";
  }

  return error;
};

export default validate;
