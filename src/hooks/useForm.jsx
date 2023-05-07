import { useState } from "react";

function useRegistrationForm(initialValues, onSubmit, validate) {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate && validate(formValues);
    setErrors(validationErrors);
    onSubmit(formValues);
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    errors,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
}

export default useRegistrationForm;
