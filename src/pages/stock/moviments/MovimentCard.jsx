import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

import ContentPage from "../../../layouts/content/ContentPage";
import useFetch from "../../../hooks/useFetchApi";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import { sleep } from "../../../utils/helperFunctions";
import {
  FormikStep,
  FormikStepper,
} from "../../../components/structured/multi-step/MultiStep";

function MovimentCard() {
  const [productSearched, setProductSearched] = useState("");

  const { data } = useFetch(
    "https://localhost:7153/api/v1/Products/getProductNamesWithCode"
  );

  const StepOne = () => {
    return (
      data && (
        <div>
          <Box paddingBottom={3} paddingTop={5}>
            <Typography
              variant="h5"
              text="Escolha o produto que deseja fazer a movimentação"
            />
          </Box>
          <Box paddingBottom={5}>
            <Autocomplete
              autoHighlight
              options={data}
              sx={{ width: 500 }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name} - ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pesquise pelo produto desejado > Produto - (Código SKU)"
                />
              )}
              value={productSearched}
              onChange={(e) => setProductSearched(e.target.innerText)}
            />
          </Box>
        </div>
      )
    );
  };

  const StepTwo = () => {
    return <div>Programar aqui dentro</div>;
  };

  const StepThree = () => {
    return <div>Outra programagem aqui rs rs</div>;
  };

  return (
    <ContentPage title="Movimentação de Estoque">
      <RegisterPanel>
        <FormikStepper
          initialValues={{}}
          onSubmit={async () => {
            await sleep(2000);
          }}
        >
          <FormikStep label="Produto">
            <StepOne />
          </FormikStep>
          <FormikStep label="Detalhes">
            <StepTwo />
          </FormikStep>
          <FormikStep label="Confirmação">
            <StepThree />
          </FormikStep>
        </FormikStepper>
      </RegisterPanel>
    </ContentPage>
  );
}

export default MovimentCard;
