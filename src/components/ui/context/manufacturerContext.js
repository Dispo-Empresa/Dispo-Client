import { createContext, useContext } from 'react';
import { useFormik } from 'formik';

import { post } from "../../../services/httpMethods";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { AbstractFormContext } from './abstractFormContext';

import validateManufacturer from "../../../pages/manufacturers/register/validate";

const ManufacturerContextProvider = ({ children }) => {
  const { showAlert, openAlert, loading, setLoading, isNewRegister, setIsNewRegister } = useContext(AbstractFormContext);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      id : 0,
      name: "",
      image: null
    },
    validationSchema: validateManufacturer,
    onSubmit: async (values) => {
      setLoading(true);
      var response = null;

      if (isNewRegister)
        response = await post(ENDPOINTS.manufacturers.createManufacturer, values);
      else
        response = await post(ENDPOINTS.manufacturers.updateManufacturer, values); 
      
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
    <ManufacturerFormikContext.Provider value={{ formik, showAlert, loading, handleBeforeSubmiting, setIsNewRegister }}>
      {children}
    </ManufacturerFormikContext.Provider>
  );
};

const ManufacturerFormikContext = createContext();

export { ManufacturerContextProvider, ManufacturerFormikContext};
