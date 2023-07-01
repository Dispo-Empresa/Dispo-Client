import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import ContentDivisor from "../../../components/structured/divisor/ContentDivisor";
import useFields from "./useFields";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { cnpjFormater } from "../../../utils/format/cnpjFormat";
import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";

function SuplierRegisterCard() {
  const [
    fields,
    errors,
    handleValidateRequiredFields,
    handleValidateErrorFields,
    handleClearFields,
    handleFieldChange,
  ] = useFields();

  const [showAlert, openAlert] = useAlertScheme();

  const RegisterSupplier = async () => {
    openAlert("success", "Sucesso", "Fornecedor registrado com sucesso!");
    handleClearFields();
  };

  return (
    <ContentPage title="Cadastro de Fornecedores">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSave={RegisterSupplier}
      >
        <MDBCol>
          <TextField
            required
            label="Nome"
            value={fields.name}
            errors={errors.name}
            onChange={(value) => handleFieldChange("name", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Nome do Representante"
            value={fields.contactName}
            errors={errors.contactName}
            onChange={(value) =>
              handleFieldChange("contactName", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Título do Representante"
            value={fields.contactTitle}
            errors={errors.contactTitle}
            onChange={(value) =>
              handleFieldChange("contactTitle", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="CNPJ"
            value={fields.cnpj}
            errors={errors.cnpj}
            placeholder="00.000.000/0000-00"
            onChange={(value) =>
              handleFieldChange("cnpj", cnpjFormater(value.target.value))
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            type="email"
            label="Email"
            value={fields.email}
            errors={errors.email}
            onChange={(value) => handleFieldChange("email", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            type="phone"
            label="Telefone"
            placeholder="+55 (00) 0 0000-0000"
            value={fields.phone}
            errors={errors.phone}
            onChange={(value) => handleFieldChange("phone", value.target.value)}
          />
        </MDBCol>
        <ContentDivisor title="Endereço" />
        <MDBCol>
          <TextField
            required
            label="País"
            value={fields.country}
            errors={errors.country}
            onChange={(value) =>
              handleFieldChange("country", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="UF"
            value={fields.uf}
            errors={errors.uf}
            onChange={(value) => handleFieldChange("uf", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Cidade"
            value={fields.city}
            errors={errors.city}
            onChange={(value) => handleFieldChange("city", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Bairro"
            value={fields.district}
            errors={errors.district}
            onChange={(value) =>
              handleFieldChange("district", value.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="CEP"
            value={fields.cep}
            errors={errors.cep}
            onChange={(value) => handleFieldChange("cep", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextArea
            label="Informação Adicional"
            value={fields.additionalInfo}
            errors={errors.additionalInfo}
            onChange={(value) =>
              handleFieldChange("additionalInfo", value.target.value)
            }
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default SuplierRegisterCard;
