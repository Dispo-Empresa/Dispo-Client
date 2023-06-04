import { useState } from "react";

import {
  validateSuplier,
  validateQuantity,
  validateProduct,
} from "./validations";

function useFieldsFirstStep() {
  const [fields, setFields] = useState({
    suplier: "",
    quantity: 0,
  });

  const [suplierError, setSuplierError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const requiredFields = ["suplier", "quantity"];

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  const handleExistsFieldsWithError = () => {
    return suplierError || quantityError;
  };

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "suplier") {
      validateSuplier(value, setSuplierError);
    }

    if (fieldName === "quantity") {
      validateQuantity(value, setQuantityError);
    }
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [
    fields,
    handleFieldChange,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    suplierError,
    quantityError,
  ];
}

function useFieldsSecondStep() {
  const [fields, setFields] = useState({
    product: "",
    description: "",
  });

  const [productError, setProductError] = useState("");

  const requiredFields = ["product"];

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  const handleExistsFieldsWithError = () => {
    return productError;
  };

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "product") {
      validateProduct(value, setProductError);
    }

    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [
    fields,
    handleFieldChange,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    productError,
  ];
}

export { useFieldsFirstStep, useFieldsSecondStep };
