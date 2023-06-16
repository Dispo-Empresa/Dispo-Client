import { useState } from "react";

function useFields() {
  const [fields, setFields] = useState({
    name: "",
    cnpj: "",
  });

  const requiredFields = ["name", "cnpj"];

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  const handleExistsFieldsWithError = () => {
    // return nameError || colorError;
  };

  const handleFieldChange = (fieldName, value) => {
    //if (fieldName === "name") {
    //  validateName(value, setNameError);
    //}

    //if (fieldName === "color") {
    //  validateColor(value, setColorError);
    //}

    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [
    fields,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    handleFieldChange,
  ];
}

export default useFields;
