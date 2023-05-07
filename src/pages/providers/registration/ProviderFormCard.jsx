import { useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../../layouts/content/ContentPage";
import Registration from "../../../layouts/panel/register-panel/RegisterPanel";
import useForm from "../../../hooks/useForm";
import TextField from "../../../components/ui/textfields/form/TextField";
import { post } from "../../../services/api/crud";
import {
  SaveButton,
  QueryDataButton,
} from "../../../components/ui/buttons/icons/IconButton";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import AlertMessagePanel from "../../../components/structured/alert/panel/AlertPanel";

function ProviderFormCard() {
  const initialState = {
    providerName: "",
    providerCnpj: "",
  };

  const [alertMessage, setAlertMessage] = useState(false);
  const { formValues, handleInputChange } = useForm(initialState);

  const RegisterProvider = async () => {
    var data = {
      name: formValues.name,
      cnpj: formValues.cnpj,
    };

    try {
      let response = await post("Providers/register", data);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const pageConfig = {
    title: "Cadastro de Produto",
    buttons: (
      <ButtonGroup>
        <SaveButton
          title="Salvar produto"
          onClick={() => {
            setAlertMessage(true);
          }}
        />
        <QueryDataButton title="Visualizar produtos" />
      </ButtonGroup>
    ),
  };

  return (
    <ContentPage {...pageConfig}>
      <Registration>
        <MDBCol>
          <TextField
            label="Informe o nome do Fornecedor"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            label="Informe o CNPJ do Fornecedor"
            value={formValues.cnpj}
            onChange={handleInputChange}
          />
        </MDBCol>
      </Registration>
    </ContentPage>
  );
}

export default ProviderFormCard;
