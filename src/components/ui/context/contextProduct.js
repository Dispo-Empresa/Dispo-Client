import { createContext, useContext } from 'react';
import { useFormik } from 'formik';

import validateProducts from "pages/products/register/validate";
import { post } from "services/httpMethods";
import { ENDPOINTS } from "utils/constants/endpoints";
import { AbstractFormContext } from './abstractFormContext';

const ProductContextProvider = ({ children }) => {
  const { showAlert, openAlert, loading, setLoading, isNewRegister, setIsNewRegister } = useContext(AbstractFormContext);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      id : 0,
      name: "",
      description: "",
      image: null,
      purchasePrice: null,
      salePrice: null,
      category: null,
      unitOfMeasurement: null,
      weight: "",
      height: "",
      width: "",
      depth: "",
    },
    validationSchema: validateProducts,
    onSubmit: async (values) => {
      setLoading(true);
      var response = null;

      if (isNewRegister)
        response = await post(ENDPOINTS.products.createProduct, values, "multipart/form-data");
      else
        response = await post(ENDPOINTS.products.updateProduct, values, "multipart/form-data"); 
      
      if (response.success) {
        openAlert(response.alertType, response.message);

        if (isNewRegister)
          formik.resetForm();

      } else {
        openAlert(response.alertType, "Erro", response.message);
      }

      setLoading(false);
    },
  });

  const handleBeforeSubmiting = () => {
    if (formik.errors) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
      return;
    }
  };

  return (
    <ProductFormikContext.Provider value={{ formik, showAlert, loading, handleBeforeSubmiting, setIsNewRegister }}>
      {children}
    </ProductFormikContext.Provider>
  );
};

const ProductFormikContext = createContext();

export { ProductContextProvider, ProductFormikContext};
