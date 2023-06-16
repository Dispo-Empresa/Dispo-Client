import { useState } from "react";
import {
  validateWarehouse,
  validateMovimentationType,
  validateProduct,
  validateQuantity,
} from "./validations";

const initialState = {
  product: -1,
  warehouse: 1,
  quantity: "",
  movimentationType: -1,
  movimentationTypes: [
    { value: 0, label: "Entrada" },
    { value: 1, label: "Saída" },
  ],
  errors: [
    {
      name: "movimentationType",
      value: "",
    },
    { name: "product", value: "" },
    { name: "quantity", value: "" },
    { name: "warehouse", value: "" },
  ],
};

const requiredFields = [
  "product",
  "warehouse",
  "quantity",
  "movimentationType",
];

const useFields = () => {
  const [fields, setFields] = useState(initialState);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    validateRequiredFields(name, value);
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleErrorFieldChange = (e) => {
    const { name, value } = e;
    setFields((prevFields) => {
      const updatedErrors = prevFields.errors.map((item) => {
        if (item.name === name) {
          return { name: name, value: value };
        }
        return item;
      });

      return {
        ...prevFields,
        errors: updatedErrors.length
          ? updatedErrors
          : [...prevFields.errors, { name: name, value: value }],
      };
    });
  };

  const handleErrorFields = () => {
    const error = fields.errors.find((item) => item.value !== "");
    return error;
  };

  const clearState = () => {
    setFields({ ...initialState });
  };

  const validateRequiredFields = (name, value) => {
    if (!requiredFields.includes(name)) {
      return;
    }

    switch (name) {
      case "product":
        handleErrorFieldChange({
          name: name,
          value: validateProduct(value),
        });
        break;
      case "warehouse":
        handleErrorFieldChange({
          name: name,
          value: validateWarehouse(value),
        });
        break;
      case "quantity":
        handleErrorFieldChange({
          name: name,
          value: validateQuantity(value),
        });
        break;
      case "movimentationType":
        handleErrorFieldChange({
          name: name,
          value: validateMovimentationType(value),
        });
        break;
    }
  };

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  return [
    fields,
    handleErrorFields,
    handleFieldChange,
    clearState,
    handleExistsRequiredFieldsNotAnswered,
  ];
};

export default useFields;
