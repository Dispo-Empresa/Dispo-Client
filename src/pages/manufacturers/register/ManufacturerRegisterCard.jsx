import { useState } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import validateManufacturers from "./validate";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { ImageField } from "../../../components/ui/inputs/image/ImageField";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { post } from "../../../services/httpMethods";

function ManufacturerRegisterCard() {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const [manufacturerLogo, setManufacturerLogo] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      logo: null,
    },
    validationSchema: validateManufacturers,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);

      const formDataValues = new FormData();
      formDataValues.append("Name", values.name);
      formDataValues.append("Logo", manufacturerLogo);

      var response = await post(
        ENDPOINTS.manufacturers.createManufacturer,
        formDataValues,
        "multipart/form-data"
      );

      if (response.success) {
        openAlert(response.alertType, response.message);

        setManufacturerLogo(null);
        formik.resetForm();
      } else {
        openAlert(response.alertType, "Erro", response.message);
      }

      setLoading(false);
    },
  });

  const handleBeforeSubmiting = () => {
    if (formik.errors) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
      return;
    }
  };

  return (
    <ContentPage title="Cadastro de Fabricantes">
      <RegisterPanel
        alertPanel={showAlert}
        onSubmit={formik.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
      >
        <MDBCol>
          <TextField
            required
            label="Nome do fabricante"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <ImageField
            label="Logo"
            value={manufacturerLogo}
            onChange={setManufacturerLogo}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ManufacturerRegisterCard;
