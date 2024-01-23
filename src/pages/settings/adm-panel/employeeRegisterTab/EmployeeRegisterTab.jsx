import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import useFetch from "hooks/useFetchApi";
import RegisterPanel from "layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "hooks/alert/useAlertScheme";
import validateEmployee from "./validate";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { MultiSelect } from "components/ui/inputs/select/SelectField";
import { RadioButtons } from "components/ui/inputs/radio/RadioButtons";
import { ENDPOINTS } from "utils/constants/endpoints";
import { post } from "services/httpMethods";

function EmployeeRegisterTab() {
  const { data: roles } = useFetch(ENDPOINTS.adm.getRoles);
  const { data: warehouses } = useFetch(ENDPOINTS.warehouses.getAll);

  const [showAlert, openAlert] = useAlertScheme();
  const formik = useFormik({
    initialValues: {
      email: "",
      warehouses: "",
      role: "",
    },
    validationSchema: validateEmployee,
    validateOnChange: false,
    onSubmit: async (values) => {
      var data = {
        email: values.email,
        roleId: values.role.value,
        warehousesId: values.warehouses,
      };

      try {
        var response = await post(ENDPOINTS.adm.createEmployee, data);

        openAlert(response.alertType, "Sucesso", response.message);
        formik.resetForm();
      } catch (error) {
        openAlert(error.alertType, "Erro", error.message);
      }
    },
  });

  return (
    <RegisterPanel alertPanel={showAlert} onSubmit={formik.handleSubmit}>
      <MDBCol>
        <TextField
          required
          type="email"
          label="Email"
          width="400px"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={(e) => formik.setFieldValue("email", e.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <MultiSelect
          required
          label="Depósitos"
          optionLabel="label"
          width="400px"
          options={
            warehouses &&
            warehouses.data.map((item) => ({
              value: item.warehouseId,
              label: item.name,
            }))
          }
          error={formik.errors.warehouses}
          value={formik.values.warehouses}
          onChange={(e) => formik.setFieldValue("warehouses", e.value)}
        />
      </MDBCol>
      <MDBCol>
        {roles && (
          <RadioButtons
            required
            label="Cargo"
            error={formik.errors.role}
            options={roles.data.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
            value={formik.values.role}
            onChange={(e) => {
              formik.setFieldValue("role", e.value);
            }}
          />
        )}
      </MDBCol>
    </RegisterPanel>
  );
}

export default EmployeeRegisterTab;
