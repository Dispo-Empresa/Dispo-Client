import { createContext, useContext } from 'react';
import { useFormik } from 'formik';

import validateSupplier from "pages/suppliers/register/validate";
import { post } from "services/httpMethods";
import { ENDPOINTS } from "utils/constants/endpoints";
import { AbstractFormContext } from './abstractFormContext';

const SupplierContextProvider = ({ children }) => {
    const { showAlert, openAlert, loading, setLoading, isNewRegister, setIsNewRegister } = useContext(AbstractFormContext);

    const formik = useFormik({
        initialValues: {
          id: 0,
          name: "",
          contactName: "",
          contactTitle: "",
          cnpj: "",
          email: "",
          phone: "",
    
          // adresses
          
          addressId: 0,
          country: "",
          uf: "",
          city: "",
          district: "",
          cep: "",
          additionalInfo: "",
        },
        validationSchema: validateSupplier,
        validateOnChange: false,
        onSubmit: async (values) => {
          setLoading(true);
          
          var dataAddress = {
            addressId: values.addressId,
            country: values.country,
            uf: values.uf,
            city: values.city,
            district: values.district,
            cep: values.cep,
            additionalInfo: values.additionalInfo,
          };
    
          var data = {
            id: values.id,
            name: values.name,
            contactName: values.contactName,
            contactTitle: values.contactTitle,
            cnpj: values.cnpj,
            email: values.email,
            phone: values.phone,
            address: dataAddress,
          };

          console.log(data);
          var response = null;

          if (isNewRegister)
            response = await post(ENDPOINTS.suppliers.createSupplier, data);
          else
            response = await post(ENDPOINTS.suppliers.updateSupplier, data);
    
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
        <SupplierFormikContext.Provider value={{ formik, showAlert, loading, handleBeforeSubmiting, setIsNewRegister }}>
          {children}
        </SupplierFormikContext.Provider>
    );   
}

const SupplierFormikContext = createContext();

export { SupplierContextProvider, SupplierFormikContext};