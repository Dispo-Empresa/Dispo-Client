import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";

import ContentPage from "../../../layouts/content/ContentPage";
import useFetch from "../../../hooks/useFetchApi";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import { sleep } from "../../../utils/helperFunctions";
import {
  FormikStep,
  FormikStepper,
} from "../../../components/structured/multi-step/MultiStep";

import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import TextField from "../../../components/ui/textfields/form/TextField";
import TextArea from "../../../components/ui/textfields/form/TextArea";
import useFields from "./useFields";
import useAlertScheme from "../../../hooks/useAlertScheme";

function MovimentCard() {
  const [fields, handleFieldChange] = useFields();
  const [showAlert, openAlert] = useAlertScheme();

  const Register = () => {
    openAlert("success", "Sucesso", "Registrado com sucesso!");
  };

  const StepTwo = () => {
    return <>Programar aqui dentro</>;
  };

  const StepThree = () => {
    return <div>Outra programagem aqui rs rs</div>;
  };

  // CRIAR UM NOVO PADRAO DE REGISTRO COM O MULTISTEP ??

  return (
    <ContentPage title="Movimentação de Estoque">
      <FormikStepper
        initialValues={{}}
        onSubmit={async () => {
          await sleep(2000);
        }}
      >
        <FormikStep label="Produto">
          <RegisterPanel onSave={Register} alertPanel={showAlert}>
            <MDBCol>
              <TextField
                required
                message="Dica do campo"
                label="Fornecedor"
                value={fields.suplier}
                onChange={(value) =>
                  handleFieldChange("suplier", value.target.value)
                }
              />
            </MDBCol>
            <MDBCol>
              <TextField
                required
                label="Quantidade"
                type="number"
                value={fields.quantity}
                onChange={(value) =>
                  handleFieldChange("quantity", value.target.value)
                }
              />
            </MDBCol>
            <MDBCol>
              <TextField
                required
                label="Produtor"
                value={fields.product}
                onChange={(value) =>
                  handleFieldChange("product", value.target.value)
                }
              />
            </MDBCol>
            <MDBCol>
              <TextArea
                name="description"
                label="Descrição"
                value={fields.description}
                onChange={(value) =>
                  handleFieldChange("description", value.target.value)
                }
              />
            </MDBCol>
          </RegisterPanel>
        </FormikStep>
        <FormikStep label="Detalhes">
          <StepTwo />
        </FormikStep>
        <FormikStep label="Confirmação">
          <StepThree />
        </FormikStep>
      </FormikStepper>
    </ContentPage>
  );
}

export default MovimentCard;
