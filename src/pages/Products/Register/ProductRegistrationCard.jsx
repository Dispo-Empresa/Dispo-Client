import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import MainContent from '../../../components/Structured/Layouts/Content/MainContent';
import Form from "../../../components/Structured/Layouts/Content/FormRegistration/Form";

import { DefaultTextField, DefaultTextArea } from '../../../components/Basic/TextField/TextField';
import { TextField } from '@mui/material';
import { handleRegisterProduct } from "../../../services/Product/productServices"
import { handleGetBrandNames } from "../../../services/Brand/brandServices"
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';

import "../../../styles/registrationContent.css"

export default function ProductRegistrationCard() {

  const [productName, setProductName] = useState("");
  const [productUnitPrice, setProductUnitPrice] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productUnitOfMeansurement, setProductUnitOfMeansurement] = useState("");
  const [productType, setProductType] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productInventory, setProductInventory] = useState(1);

  const [BrandsRegistered, setBrandsRegistered] = useState([]);
  const [alertMessage, setAlertMessage] = useState([]);

// Passar os enums do c# para o react ou deixar assim?????

  const unitOfMeansurement = [
    'Meter',
    'Liter',
    'Kilo',
    'Gram',
    'Unit'
  ];

  const productTypes = [
    'Comida',
    'Roupas',
    'Eletronicos',
    'Livros'
  ];

  const productColors = [
    'Amarelo',
    'Vermelho',
    'Roxo',
    'Azul',
    'Verde',
    'Branco',
    'Preto'
  ];

  useEffect(() => {

    handleGetBrandNames()
    .then(function(res)
    { 
      setBrandsRegistered(res.data);
    })
    .catch(function(err)
    { 
      console.log(err)
    });
  }, []);

  const RegisterProduct = () => {

    var data = {
      name: productName,
      UnitPrice: productUnitPrice,
      Color: productColor,
      Description: productDescription,
      UnitOfMeasurement: productUnitOfMeansurement,
      Type: productType,
      BrandName: productBrand,
      InventoryId: 1,
    };

    handleRegisterProduct(data)
    .then(function(res){

      setAlertMessage([{ description: res.data.message, type: res.data.alertType }]);
      console.log(alertMessage)

    })
    .catch(function(err){
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
              <DefaultTextField label="Nome do produto" width="400px" variant="outlined" type="text" value={productName} 
                                onChange={(e) => setProductName(e.target.value) } />
          </MDBCol>
          <MDBCol md='5'>
            <Autocomplete
              disablePortal
              options={BrandsRegistered}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Marca" inputProps={{ style: { height: 0 } }} />}
              value={productBrand}
              onChange={(e) => setProductBrand(e.target.innerText) }
            />
          </MDBCol>
          <MDBCol md='6'>
            <Autocomplete
              disablePortal
              options={unitOfMeansurement}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="UoM" />}
              value={productUnitOfMeansurement}
              onChange={(e) => setProductUnitOfMeansurement(e.target.innerText) }
            />
          </MDBCol>
          <MDBCol md='6' className='mb-4'>
            <Autocomplete
              disablePortal
              options={productColors}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Cor" />}
              value={productColor}
              onChange={(e) => setProductColor(e.target.innerText) }
            />
          </MDBCol>
          <MDBCol md='6'>
            <Autocomplete
              disablePortal
              options={productTypes}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Tipo" />}
              value={productType}
              onChange={(e) => setProductType(e.target.innerText) }
            />
          </MDBCol>
          <MDBCol md='6'>
            <Autocomplete
              disablePortal
              options={[]}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Inventário" />}
              value={productInventory}
              onChange={(e) => setProductInventory(e.target.innerText) }
            />
          </MDBCol>
          <MDBCol md='6'>
              <DefaultTextArea label="Descrição" rows="3" width="400px" value={productDescription} 
                               onChange={(e) => setProductDescription(e.target.value) } />
          </MDBCol>
          <MDBCol md='6'>
            <CurrencyTextField
	            label="Preço unitário"
	            variant="filled"
	            value={productUnitPrice}
              unselectable
	            currencySymbol="R$"
              style={{ width: "400px" }}
              onChange={(event, value)=> setProductUnitPrice(value)}
            />
          </MDBCol>
        </MDBRow>

      </Form>
    </MainContent>
  );
}