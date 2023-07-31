import { useState } from "react";

import useFetch from "../../../../hooks/useFetchApi";
import validate from "./validations";
import { ENDPOINTS } from "../../../../utils/constants/endpoints";

const initialState = {
  email: "",
  warehouses: [],
  role: -1,

  warehousesOptions: [
    { value: 1, label: "Depósito 1" },
    { value: 13, label: "Depósito 2" },
    { value: 7, label: "Depósito 3" },
  ],
};

function useFields() {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({
    email: "",
  });
  const requiredFields = ["email", "warehouses", "roles"];
  const { data: roles } = useFetch(ENDPOINTS.adm.getRoles);

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

  const handleWarehouseChange = (selected) => {
    const selectedWarehouses = selected.map((option) => option.value);
    handleFieldChange("warehouses", selectedWarehouses);
  };

  return [
    fields,
    errors,
    roles,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
    handleWarehouseChange,
  ];
}

export default useFields;
