import { useState } from "react";

import validate from "./validations";

const initialState = {
  name: "",
  description: "",
  image: "",
  code: "",
  purchasePrice: "",
  salePrice: "",
  category: "",
  unitOfMeasurement: "",
  //manufacturingDate: "",
  //expirationDate: "",

  // dimension

  weight: "",
  height: "",
  width: "",
  depth: "",

  categoryTypes: [
    { value: 0, label: "Alimentação" },
    { value: 1, label: "Bebidas" },
    { value: 2, label: "Vestuário" },
    { value: 3, label: "Esporte" },
    { value: 4, label: "Cosmético" },
    { value: 5, label: "Livros" },
    { value: 6, label: "Eletrônico" },
    { value: 7, label: "Video Games" },
    { value: 8, label: "Presentes" },
    { value: 9, label: "Informática" },
    { value: 10, label: "Outros" },
  ],

  unitOfMeasurementTypes: [
    { value: 0, label: "KG (Kilograma)" },
    { value: 1, label: "G (Grama)" },
    { value: 2, label: "L (Litro)" },
    { value: 3, label: "ML (Mililitro)" },
    { value: 4, label: "M (Metro)" },
    { value: 5, label: "CM  (Centímetro)" },
    { value: 6, label: "Outros" },
  ],
};

function useFields() {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "",
    salePrice: "",
    category: "",
    unitOfMeasurement: "",
  });
  const requiredFields = [
    "name",
    "description",
    "purchasePrice",
    "salePrice",
    "category",
    "unitOfMeasurement",
  ];

  const handleValidateRequiredFields = () => {
    return requiredFields.filter((field) => fields[field] === "").length > 0;
  };

  const handleValidateErrorFields = () => {
    return Object.values(errors).find((error) => Boolean(error)) || null;
  };

  const handleClearFields = () => {
    setFields({ ...initialState });
  };

  const handleFieldChange = (fieldName, value) => {
    setErrors((prevFields) => ({
      ...prevFields,
      [fieldName]: validate(fieldName, value),
    }));

    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  return [
    fields,
    errors,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
  ];
}

export default useFields;
