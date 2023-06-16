import { useState } from "react";

import { validateName, validateColor } from "./validations";

function useFields() {
  const [fields, setFields] = useState({
    name: "",
    unitPrice: "",
    color: "",
    unitOfMeansurement: "",
    type: "",
    brandId: "",
    description: "",
  });

  const [nameError, setNameError] = useState("");
  const [colorError, setColorError] = useState("");

  const requiredFields = [
    "name",
    "unitPrice",
    "color",
    "unitOfMeansurement",
    "type",
  ];

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  const handleExistsFieldsWithError = () => {
    return nameError || colorError;
  };

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "name") {
      validateName(value, setNameError);
    }

    if (fieldName === "color") {
      validateColor(value, setColorError);
    }

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
    nameError,
    colorError,
  ];
}

export default useFields;
