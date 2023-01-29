import React, { useState, useEffect } from 'react';
import Sidebar from "../../../components/Structured/Sidebar/Sidebar"
import Autocomplete from '@mui/material/Autocomplete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { Box, Card, CardContent } from '@material-ui/core';
import { DefaultTextField, DefaultTextArea } from '../../../components/Basic/TextField/TextField';
import { TextField } from '@mui/material';
import { handleRegisterProduct } from "../../../services/Product/productServices"
import { handleGetBrandNames } from "../../../services/Brand/brandServices"
import { DefaultButton } from '../../../components/Basic/Button/Default/DefaultButton';
import { BACKGROUNDS, COLORS } from '../../../config/defaultColors';

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
    'Eletronico',
    'Livro'
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
      console.log(res.data);
      setBrandsRegistered(res.data);
    })
    .catch(function(err)
    { 
      console.log(err)
    });
  });

  const handleSalvarProduto = () => {

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

      alert(res.data);

    })
    .catch(function(err){
      
      alert(err);

    })
  };

  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="Cadastro de Produto" contentMarginLeft="4%" >
        <div style={{ marginLeft: "4%", width: "1400px" }}>
          <Card style={{ border: "1px solid #e7ecf1", marginBottom: "2%" }}>
            <CardContent>
              <div class="container">
                <div class="content">
                  <form action="#">
                    <div class="user-details">
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="Nome do produto" width="500px" variant="outlined" type="text" value={productName} 
                                            onChange={(e) => setProductName(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <Autocomplete
                            disablePortal
                            options={BrandsRegistered}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Marca" />}
                            value={productBrand}
                            onChange={(e) => setProductBrand(e.target.innerText) }
                          />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Autocomplete
                          disablePortal
                          options={unitOfMeansurement}
                          sx={{ width: 150 }}
                          renderInput={(params) => <TextField {...params} label="UoM" />}
                          value={productUnitOfMeansurement}
                          onChange={(e) => setProductUnitOfMeansurement(e.target.innerText) }
                        />
                      </div>
                      <div class="input-box">
                        <Autocomplete
                          disablePortal
                          options={productColors}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Cor" />}
                          value={productColor}
                          onChange={(e) => setProductColor(e.target.innerText) }
                        />
                      </div>
                      <div class="input-box">
                        <Autocomplete
                          disablePortal
                          options={productTypes}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Tipo" />}
                          value={productType}
                          onChange={(e) => setProductType(e.target.innerText) }
                        />
                      </div>
                      <div class="input-box">
                        <Autocomplete
                          disablePortal
                          options={[]}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Inventário" />}
                          value={productInventory}
                          onChange={(e) => setProductInventory(e.target.innerText) }
                        />
                      </div>
                      <div class="input-box">
                        <Box paddingBottom={2}>
                          <DefaultTextArea label="Descrição" rows="3" width="500px" value={productDescription} 
                                           onChange={(e) => setProductDescription(e.target.value) } />
                        </Box>
                      </div>
                      <div class="input-box">
                        <Box paddingBottom={2}>
                          <CurrencyTextField
	                          label="Preço unitário"
	                          variant="filled"
	                          value={productUnitPrice}
                            unselectable
	                          currencySymbol="R$"
                            style={{ width: "200px" }}
                            onChange={(event, value)=> setProductUnitPrice(value)}
                          />
                        </Box>
                      </div>
                    </div>
                    <div>
                      <Box paddingBottom={5}>
                        <DefaultButton backgroundColor={COLORS.PrimaryColor} title="Registrar" width="300px" height="50px"
                                       onClick={handleSalvarProduto} />
                      </Box>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}