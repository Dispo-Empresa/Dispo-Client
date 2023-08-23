/* eslint-disable no-useless-escape */

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Campo obrigatório';
  } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.warehouses) {
    errors.warehouses = "Campo obrigatório";
  }

  if (!values.role) {
    errors.role = "Campo obrigatório";
  }

  return errors;
};

export default validate;