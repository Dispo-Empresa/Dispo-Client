import { useEffect, useState } from "react";

import validate from "./validations";
import useFetch from "../../../hooks/useFetchApi";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

const initialState = {
  movimentationType: "",
  product: "",
  quantity: "",
  movimentationTypes: [
    { value: 0, label: "Entrada" },
    { value: 1, label: "Saída" },
  ],
};

function useFields() {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({
    movimentationType: "",
    product: "",
    quantity: "",
  });
  const [products, setProducts] = useState([]);
  const { data } = useFetch(ENDPOINTS.products.getProductNamesWithCode);
  const requiredFields = ["movimentationType", "product", "quantity"];

  const GetProducts = () => {
    setProducts(
      data.data.map((item) => ({ value: item.id, label: item.name }))
    );
  };
  useEffect(GetProducts, [setProducts]);

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
    products,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
  ];
}

export default useFields;