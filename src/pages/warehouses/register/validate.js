const validate = values => {
  const errors = {};

  if (values.name.length < 3) {
    errors.name = "O Nome do depósito deve ter mais de 2 caractéres.";
  }

  if (values.address < 1) {
    errors.address = "O Endereço do depósito é inválido.";
  }

  return errors;
};

export default validate;
