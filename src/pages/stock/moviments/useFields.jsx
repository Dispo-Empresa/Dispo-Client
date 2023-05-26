import { useState } from "react";

function useFields() {
  const [fields, setFields] = useState({
    suplier: "",
    quantity: 0,
    product: "",
    description: "",
  });

  const requiredFields = ["suplier", "quantity", "product", "description"];

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  const handleExistsFieldsWithError = () => {};

  const handleFieldChange = (fieldName, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [fields, handleFieldChange];
}

export default useFields;
