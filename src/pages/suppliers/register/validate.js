const requiredFields = ["name", "contactName", "contactTitle", "cnpj", "email", "phone", "country", "uf", "city", "district", "cep" ];

const validate = values => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!values.name) {
      errors[field] = "Campo obrigatório"
    }
  });

  return errors;
};
  
  export default validate;