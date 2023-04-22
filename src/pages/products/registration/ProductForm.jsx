import Autocomplete from '@mui/material/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { useState } from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Main from '../../../layouts/content/Main';
import Registration from "../../../layouts/form/registration/Registration";
import useForm from '../../../hooks/useForm';
import useBrandNames from "../../../services/fetch/brand"
import TextField from '../../../components/ui/textfields/form/TextField';
import TextArea from '../../../components/ui/textfields/form/TextArea';
import * as Enum from "./enums";
import { create } from "../../../services/api/crud"

function ProductForm() {
    
    //const initialState = {
    //    productName: "",
    //    productUnitPrice: "",
    //    productColor: "",
    //    productDescription: "",
    //    productUnitOfMeansurement: "",
    //    productType: "",
    //    productBrand: "",
    //    productInventory: 1,
    //};
//
    //const { values, errors, handleChange, handleSubmit } = useForm(initialState);
//
    //const [alertMessage, setAlertMessage] = useState([]);
//
    //const { brandNames, loadingBrands, errorBrands } = useBrandNames('https://localhost:7153/api/v1/Products/register');
//
    //const RegisterProduct = () => {
//
    //  var data = {
    //      name: values.productName,
    //      UnitPrice: values.productUnitPrice,
    //      Color: values.productColor,
    //      Description: values.productDescription,
    //      UnitOfMeasurement: values.productUnitOfMeansurement,
    //      Type: values.productType,
    //      BrandName: values.productBrand,
    //      InventoryId: values.productInventory,
    //  };
//
    //  try {
//
    //    let response = create("/Products/register" , data);
    //    setAlertMessage([{ description: response.message, type:response.alertType }])
//
    //  }catch (err) {
//
    //    if(err.response.data){
    //        setAlertMessage([{ description: err.response.data.message, type: "error" }]);
    //    }else{
    //        setAlertMessage([{ description: "Serviço não encontrado ou fora do ar", type: "error" }]);
    //    }}
    //}
//
    //return (
    //    <Main title="Cadastro de Produto" alertMessage={alertMessage} >
    //        <Registration width="1000px" onSave={RegisterProduct}>
    //            <MDBRow className='g-4'>
    //                <MDBCol md='6'>
    //                    <TextField label="Nome do produto" width="400px" variant="outlined" type="text"
    //                                      value={values.productName} onChange={handleChange} />
    //                </MDBCol>
    //                <MDBCol md='5'>
    //                    <Autocomplete
    //                        disablePortal
    //                        options={brandNames.data}
    //                        sx={{ width: 400 }}
    //                        renderInput={(params) => <TextField {...params} label="Marca" inputProps={{ style: { height: 0 } }} />}
    //                        value={values.productBrand}
    //                        onChange={handleChange}
    //                    />
    //                </MDBCol>
    //                    <MDBCol md='6'>
    //                      <Autocomplete
    //                          disablePortal
    //                          options={Enum.unitOfMeansurement}
    //                          sx={{ width: 400 }}
    //                          renderInput={(params) => <TextField {...params} label="UoM" />}
    //                          value={values.productUnitOfMeansurement}
    //                          onChange={handleChange}
    //                      />
    //                    </MDBCol>
    //                    <MDBCol md='6' className='mb-4'>
    //                      <Autocomplete
    //                          disablePortal
    //                          options={Enum.productColors}
    //                          sx={{ width: 400 }}
    //                          renderInput={(params) => <TextField {...params} label="Cor" />}
    //                          value={values.productColor}
    //                          onChange={handleChange}
    //                      />
    //                    </MDBCol>
    //                    <MDBCol md='6'>
    //                      <Autocomplete
    //                          disablePortal
    //                          options={Enum.productTypes}
    //                          sx={{ width: 400 }}
    //                          renderInput={(params) => <TextField {...params} label="Tipo" />}
    //                          value={values.productType}
    //                          onChange={handleChange}
    //                      />
    //                    </MDBCol>
    //                    <MDBCol md='6'>
    //                      <Autocomplete
    //                          disablePortal
    //                          options={[]}
    //                          sx={{ width: 400 }}
    //                          renderInput={(params) => <TextField {...params} label="Inventário" />}
    //                          value={values.productInventory}
    //                          onChange={handleChange}
    //                      />
    //                    </MDBCol>
    //                <MDBCol md='6'>
    //                    <TextArea label="Descrição" rows="3" width="400px" value={values.productDescription} 
    //                                     onChange={handleChange} />
    //                </MDBCol>
    //                  <MDBCol md='6'>
    //                    <CurrencyTextField
	//                          label="Preço unitário"
	//                          variant="filled"
	//                          value={values.productUnitPrice}
    //                        unselectable
	//                          currencySymbol="R$"
    //                        style={{ width: "400px" }}
    //                        onChange={handleChange}
    //                    />
    //                  </MDBCol>
    //            </MDBRow>
    //        </Registration>
    //    </Main>
    //);
}

export default ProductForm;