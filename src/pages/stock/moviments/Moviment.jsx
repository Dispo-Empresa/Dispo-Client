import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Box } from '@material-ui/core';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import Main from '../../../layouts/content/Main';
import { FormikStep, FormikStepper } from "../../../components/structured/multi-step/MultiStep"
import { sleep } from "../../../utils/helperFunctions"
import useFetch from "../../../hooks/useFetchApi"

function Moviment() {
  
    //const [productSearched, setProductSearched] = useState("");
//
    //const { data, loading, error } = useFetch('https://localhost:7153/api/v1/Products/getProductNamesWithCode');
//
    //return (
    //    <Main title="Movimentação de Estoque">
    //        <FormikStepper initialValues={{}} onSubmit={async () => { await sleep(2000) }}>
    //            <FormikStep label="Produto">
    //                <Box paddingBottom={3} paddingTop={5}>
    //                    <Typography variant="h5" text="Escolha o produto que deseja fazer a movimentação" />
    //                </Box>
    //                <Box paddingBottom={5}>
    //                  <Autocomplete 
    //                    autoHighlight 
    //                    options={data.data}
    //                    sx={{ width: 500 }}
    //                    renderOption={(props, option) => (
    //                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
    //                        {option.name} - ({option.code})
    //                      </Box>
    //                    )}
    //                    renderInput={(params) => <TextField {...params} label="Pesquise pelo produto desejado > Produto - (Código SKU)" />}
    //                    value={productSearched}
    //                    onChange={(e) => setProductSearched(e.target.innerText) }
    //                  />
    //                </Box>
    //            </FormikStep>
    //            <FormikStep label="Detalhes">
    //                <div class="container">
    //                    <div class="content">
    //                        <form action="#">
    //                        </form>
    //                    </div>
    //                </div>
    //            </FormikStep>
    //            <FormikStep label="Confirmação">
    //            </FormikStep>
    //        </FormikStepper>
    //    </Main>
    //);
}

export default Moviment;