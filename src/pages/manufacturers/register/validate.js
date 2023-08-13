const validate = values => {
  const errors = {};

  if(!values.name){
    errors.name = "Campo obrigatório"
  }

  return errors;
};

export default validate;