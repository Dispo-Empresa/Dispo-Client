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

function useFields() {
  const [fields, setFields] = useState(initialState);

  const [productError, setProductError] = useState("");
  const [warehouseError, setWarehouseError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [movimentationTypeError, setMovimentationTypeError] = useState("");

  const requiredFields = [
    "product",
    "warehouse",
    "quantity",
    "movimentationType",
  ];

  const handleExistsRequiredFieldsNotAnswered = () => {
    return requiredFields.filter((field) => !fields[field]).length > 0;
  };

  const handleExistsFieldsWithError = () => {
    return (
      productError || warehouseError || quantityError || movimentationTypeError
    );
  };

  const clearState = () => {
    setFields({ ...initialState });
  };

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === "warehouse") {
      validateWarehouse(value, setWarehouseError);
    }

    if (fieldName === "movimentationType") {
      validateMovimentationType(value, setMovimentationTypeError);
    }

    if (fieldName === "product") {
      validateProduct(value, setProductError);
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
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    handleFieldChange,
    clearState,
    productError,
    warehouseError,
    quantityError,
    movimentationTypeError,
  ];
}

//const requiredFields = [
//  "product",
//  "warehouse",
//  "quantity",
//  "movimentationType",
//];
//
//const useFields = () => {
//  const [fields, setFields] = useState(initialState);
//
//  const handleFieldChange = (fieldName, value) => {
//    validateRequiredFields(name, value);
//    setFields((prevFields) => ({
//      ...prevFields,
//      [name]: value,
//    }));
//  };
//
//  const handleFieldChange = (fieldName, value) => {
//    if (fieldName === "name") {
//      validateName(value, setNameError);
//    }
//
//    if (fieldName === "color") {
//      validateColor(value, setColorError);
//    }
//
//    setFields((prevFields) => ({
//      ...prevFields,
//      [fieldName]: value,
//    }));
//  };
//
//  const handleErrorFieldChange = (e) => {
//    const { name, value } = e;
//    setFields((prevFields) => {
//      const updatedErrors = prevFields.errors.map((item) => {
//        if (item.name === name) {
//          return { name: name, value: value };
//        }
//        return item;
//      });
//
//      return {
//        ...prevFields,
//        errors: updatedErrors.length
//          ? updatedErrors
//          : [...prevFields.errors, { name: name, value: value }],
//      };
//    });
//  };
//
//  const handleErrorFields = () => {
//    const error = fields.errors.find((item) => item.value !== "");
//    return error;
//  };
//
//  const clearState = () => {
//    setFields({ ...initialState });
//  };
//
//  const validateRequiredFields = (name, value) => {
//    if (!requiredFields.includes(name)) {
//      return;
//    }
//
//    // eslint-disable-next-line default-case
//    switch (name) {
//      case "product":
//        handleErrorFieldChange({
//          name: name,
//          value: validateProduct(value),
//        });
//        break;
//      case "warehouse":
//        handleErrorFieldChange({
//          name: name,
//          value: validateWarehouse(value),
//        });
//        break;
//      case "quantity":
//        handleErrorFieldChange({
//          name: name,
//          value: validateQuantity(value),
//        });
//        break;
//      case "movimentationType":
//        handleErrorFieldChange({
//          name: name,
//          value: validateMovimentationType(value),
//        });
//        break;
//    }
//  };
//
//  const handleExistsRequiredFieldsNotAnswered = () => {
//    return requiredFields.filter((field) => !fields[field]).length > 0;
//  };
//
//  return [
//    fields,
//    handleErrorFields,
//    handleFieldChange,
//    clearState,
//    handleExistsRequiredFieldsNotAnswered,
//  ];
//};

export default useFields;
