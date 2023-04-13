import { useState } from 'react';
import { TextField } from '@mui/material';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import { DefaultTextField, DefaultTextArea } from '../../../components/Basic/TextField/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import MainContent from '../../../components/Structured/Layouts/Content/MainContent';
import Form from "../../../components/Structured/Layouts/Content/FormRegistration/Form";
import useBrandNames from "../../../services/fetch/brand"
import useForm from '../../../hooks/useForm';
import * as Enum from "./enums";

function ProductRegistrationCard() {
    
    const initialState = {
        productName: "",
        productUnitPrice: "",
        productColor: "",
        productDescription: "",
        productUnitOfMeansurement: "",
        productType: "",
        productBrand: "",
        productInventory: 1,
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate);

    const [alertMessage, setAlertMessage] = useState([]);

    const { brandNames, loadingBrands, errorBrands } = useBrandNames('https://localhost:7153/api/v1/Brands/getBrandNames');

    const RegisterProduct = () => {

      var data = {
          name: values.productName,
          UnitPrice: values.productUnitPrice,
          Color: values.productColor,
          Description: values.productDescription,
          UnitOfMeasurement: values.productUnitOfMeansurement,
          Type: values.productType,
          BrandName: values.productBrand,
          InventoryId: values.productInventory,
      };

      createAPIEndpoint(endpoints.product.registerProduct)
          .post(data)
          .then(res => {

            setAlertMessage([{ description: res.data.message, type: res.data.alertType }]);
            console.log(alertMessage)

      })
      .catch(err => {
        console.log(alertMessage)

        if (err.response.data){
          setAlertMessage([{ description: err.response.data.message, type: "error" }]);
        }else{
          setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
        }

        console.log(err);

      })
    };

    return (
        <MainContent title="Cadastro de Produto" alertMessage={alertMessage} >
            <Form width="1000px" onSave={RegisterProduct}>
                <MDBRow className='g-4'>
                    <MDBCol md='6'>
                        <DefaultTextField label="Nome do produto" width="400px" variant="outlined" type="text"
                                          value={values.productName} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol md='5'>
                        <Autocomplete
                            disablePortal
                            options={brandNames.data}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Marca" inputProps={{ style: { height: 0 } }} />}
                            value={values.productBrand}
                            onChange={handleChange}
                        />
                    </MDBCol>
                        <MDBCol md='6'>
                          <Autocomplete
                              disablePortal
                              options={Enum.unitOfMeansurement}
                              sx={{ width: 400 }}
                              renderInput={(params) => <TextField {...params} label="UoM" />}
                              value={values.productUnitOfMeansurement}
                              onChange={handleChange}
                          />
                        </MDBCol>
                        <MDBCol md='6' className='mb-4'>
                          <Autocomplete
                              disablePortal
                              options={Enum.productColors}
                              sx={{ width: 400 }}
                              renderInput={(params) => <TextField {...params} label="Cor" />}
                              value={values.productColor}
                              onChange={handleChange}
                          />
                        </MDBCol>
                        <MDBCol md='6'>
                          <Autocomplete
                              disablePortal
                              options={Enum.productTypes}
                              sx={{ width: 400 }}
                              renderInput={(params) => <TextField {...params} label="Tipo" />}
                              value={values.productType}
                              onChange={handleChange}
                          />
                        </MDBCol>
                        <MDBCol md='6'>
                          <Autocomplete
                              disablePortal
                              options={[]}
                              sx={{ width: 400 }}
                              renderInput={(params) => <TextField {...params} label="Inventário" />}
                              value={values.productInventory}
                              onChange={handleChange}
                          />
                        </MDBCol>
                    <MDBCol md='6'>
                        <DefaultTextArea label="Descrição" rows="3" width="400px" value={values.productDescription} 
                                         onChange={handleChange} />
                    </MDBCol>
                      <MDBCol md='6'>
                        <CurrencyTextField
	                          label="Preço unitário"
	                          variant="filled"
	                          value={values.productUnitPrice}
                            unselectable
	                          currencySymbol="R$"
                            style={{ width: "400px" }}
                            onChange={handleChange}
                        />
                      </MDBCol>
                </MDBRow>
            </Form>
        </MainContent>
    );
}

export default ProductRegistrationCard;