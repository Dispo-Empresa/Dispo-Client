import { MDBCol } from "mdb-react-ui-kit";

import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useFields from "./useFields";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import RadioButtons from "../../../components/ui/inputs/radio/RadioButtons";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { SelectMulti } from "../../../components/ui/inputs/select/SelectField";
import { post } from "../../../services/httpMethods";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

function UserRegisterTab() {
  const [fields, errors, roles, handleFieldChange, handleWarehouseChange] =
    useFields();
  const [showAlert, openAlert] = useAlertScheme();

  const RegisterUser = async () => {
    var data = {
      email: fields.email,
      roleId: fields.role,
      warehousesId: fields.warehouses,
    };

    try {
      var response = await post(ENDPOINTS.adm.createEmployee, data);

      openAlert(response.alertType, "Sucesso", response.message);
    } catch (error) {
      openAlert(error.alertType, "Erro", error.message);
    }
  };

  return (
    <RegisterPanel alertPanel={showAlert} onSave={RegisterUser}>
      <MDBCol>
        <TextField
          required
          type="email"
          label="Email"
          width="400px"
          value={fields.email}
          error={errors.email}
          onChange={(value) => handleFieldChange("email", value.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <TextField
          required
          disabled
          type="password"
          label="Senha"
          width="250px"
          tip="A senha vai ser refatorada pelo usuário no primeiro momento do login"
          value="alterarsenha"
          onChange={() => {}}
        />
      </MDBCol>
      <MDBCol>
        <SelectMulti
          label="Depósitos"
          options={fields.warehousesOptions}
          onChange={handleWarehouseChange}
        />
      </MDBCol>
      <MDBCol>
        {roles && (
          <RadioButtons
            label="Cargo"
            align="vertical"
            options={roles.data.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
            onChange={(value) => handleFieldChange("role", value.target.value)}
          />
        )}
      </MDBCol>
    </RegisterPanel>
  );
}

export default UserRegisterTab;
