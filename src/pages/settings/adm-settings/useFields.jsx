import { useState } from "react";

import useFetch from "../../../hooks/useFetchApi";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

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
  const { data: roles } = useFetch(ENDPOINTS.adm.GetRoles);

  const handleFieldChange = (fieldName, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  const handleWarehouseChange = (selected) => {
    const selectedWarehouses = selected.map((option) => option.value);
    handleFieldChange("warehouses", selectedWarehouses);
  };

  return [fields, errors, roles, handleFieldChange, handleWarehouseChange];
}

export default useFields;
