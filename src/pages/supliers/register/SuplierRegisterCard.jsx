import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register-panel/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import useFields from "./useFields";
import TextField from "../../../components/ui/textfields/form/TextField";
import { post } from "../../../services/api/crud";
import { cnpjFormater } from "../../../utils/format/cnpjFormat";

function SuplierRegisterCard() {
  const [
    fields,
    handleExistsRequiredFieldsNotAnswered,
    handleExistsFieldsWithError,
    handleFieldChange,
  ] = useFields();

  const [showAlert, openAlert] = useAlertScheme();

  const RegisterProvider = async () => {
    if (handleExistsRequiredFieldsNotAnswered()) {
      openAlert(
        "warning",
        "Aviso",
        "Existem campos obrigatórios não respondidos, verifique!"
      );
      return;
    }

    if (handleExistsFieldsWithError()) {
      openAlert("warning", "Aviso", "Existem campos com erros, verifique!");
      return;
    }

    var data = {
      name: fields.name,
      cnpj: fields.cnpj,
    };
    try {
      let response = await post("Providers/register", data);

      if (response.success) {
        openAlert("success", "Sucesso", response.message);
      } else {
        openAlert("error", "Erro", response.message);
      }
    } catch (err) {
      openAlert("error", "Erro", err.message);
    }
  };

  return (
    <ContentPage title="Cadastro de Fornecedores">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSave={RegisterProvider}
      >
        <MDBCol>
          <TextField
            required
            label="Nome"
            value={fields.name}
            onChange={(value) => handleFieldChange("name", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="CNPJ"
            value={fields.cnpj}
            placeholder="00.000.000/0000-00"
            onChange={(value) =>
              handleFieldChange("cnpj", cnpjFormater(value.target.value))
            }
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default SuplierRegisterCard;
