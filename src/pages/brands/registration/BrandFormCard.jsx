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

function BrandFormCard() {
  const initialState = {
    name: "",
  };

  const [alertMessage, setAlertMessage] = useState(false);
  const { formValues, handleInputChange } = useForm(initialState);

  const RegisterBrand = async () => {
    var data = {
      name: formValues,
    };

    try {
      let response = await post("Brands/register", data);
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
            label="Nome"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </MDBCol>
      </Registration>
    </ContentPage>
  );
}

export default BrandFormCard;
