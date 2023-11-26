import { createContext, useState } from 'react';
import { useFormik } from 'formik';

import { post } from "../../../services/httpMethods";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

import useAlertScheme from '../../../hooks/alert/useAlertScheme';
import validate from "../../../pages/products/register/validate";

const ProductContextProvider = ({ children }) => {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(true);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      description: "",
      image: null,
      purchasePrice: null,
      salePrice: null,
      category: null,
      unitOfMeasurement: null,

      // dimension
      weight: "",
      height: "",
      width: "",
      depth: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("Chamou")

      setLoading(true);
      var response = null;
      if (isNewProduct)
        response = await post(ENDPOINTS.products.createProduct, values);
      else
        response = {sucess: true, alertType: "error", message: "Editando produtos :), só que não, falta fazer API"};  
      
      if (response.success) {
        openAlert(response.alertType, response.message);
        formik.resetForm();
      } else {
        openAlert(response.alertType, "Erro", response.message);
      }

      setLoading(false);
    },
  });

  const handleBeforeSubmiting = () => {
    if (formik.errors) {
      //openAlert("error", "Existem campos com erro, por favor verifique!");
      //  return;
    }
  };

  return (
    <ProductFormikContext.Provider value={{ formik, showAlert, loading, handleBeforeSubmiting, setIsNewProduct }}>
      {children}
    </ProductFormikContext.Provider>
  );
};

const ProductFormikContext = createContext();

export { ProductContextProvider, ProductFormikContext};
