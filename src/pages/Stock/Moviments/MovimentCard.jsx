import React, { useState, useEffect } from 'react';
import MainContent from '../../../components/Structured/Layouts/Content/MainContent';
import Autocomplete from '@mui/material/Autocomplete';

import { Box } from '@material-ui/core';
import { FormikStep, FormikStepper } from "../../../components/Structured/Multistep/Formik/MultiStepFormik"
import { sleep } from "../../../utils/helperFunctions"
import { DefaultTypography } from "../../../components/Basic/Labels/Typography";
import { TextField } from '@mui/material';
import { handleGetProductNamesWithCode } from "../../../services/Product/productServices"

export default function MovimentCard() {
  
  const [productSearched, setProductSearched] = useState("");
  const [productsRegistered, setProductsRegistered] = useState([]);

  useEffect(() => { // call api only once || important to fetch data from api endpoints

    handleGetProductNamesWithCode()
    .then(function(res)
    { 
      setProductsRegistered(res.data);
    })
    .catch(function(err)
    { 
      console.log(err)
    });
  });

  return (
    <MainContent title="Movimentação de Estoque">
      <FormikStepper initialValues={{}} onSubmit={async () => { await sleep(2000) }}>
        <FormikStep label="Produto">
          <Box paddingBottom={3} paddingTop={5}>
            <DefaultTypography variant="h5" text="Escolha o produto que deseja fazer a movimentação" />
          </Box>
          <Box paddingBottom={5}>
            <Autocomplete 
              autoHighlight 
              options={productsRegistered}
              sx={{ width: 500 }}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.name} - ({option.code})
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Pesquise pelo produto desejado > Produto - (Código SKU)" />}
              value={productSearched}
              onChange={(e) => setProductSearched(e.target.innerText) }
            />
          </Box>
        </FormikStep>
        <FormikStep label="Detalhes">
          <div class="container">
            <div class="content">
              <form action="#">
              </form>
            </div>
          </div>
        </FormikStep>
        <FormikStep label="Confirmação">
              
        </FormikStep>
      </FormikStepper>
    </MainContent>
  );
}
