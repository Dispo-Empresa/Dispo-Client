import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../../layouts/content/ContentPage";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { SelectWithFilter } from "../../../components/ui/inputs/select/SelectField";
import useFields from "./useFields";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { post } from "../../../services/httpMethods";
import { useFormik } from "formik";
import { useState } from "react";
import validate from "./validate";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";

function WarehouseRegisterCard() {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: 0,
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);

      let response = await post(ENDPOINTS.warehouses.create, {
        name: values.name,
        addressId: values.address,
      });

      if (response.success) {
        openAlert(response.alertType, response.message);
        formik.resetForm();
      } else {
        openAlert(response.alertType, "Erro", response.message);
      }

      setLoading(false);
    },
  });

  const handleBeforeSubmiting = () => {
    if (!formik.isValid) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
    }
  };

  const [addresses] = useFields();

  return (
    <ContentPage title="Cadastro de Depósitos">
      <RegisterPanel
        onSave={handleBeforeSubmiting}
        onSubmit={formik.handleSubmit}
        title="Informações Básicas"
        alertPanel={showAlert}
        loading={loading}
      >
        <MDBCol>
          <TextField
            required
            label="Nome"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <SelectWithFilter
            required
            label="Endereço"
            options={addresses}
            value={formik.values.address}
            error={formik.errors.address}
            onChange={(e) => formik.setFieldValue("address", e.target.value)}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default WarehouseRegisterCard;