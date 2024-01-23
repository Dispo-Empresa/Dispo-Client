import { useFormik } from "formik";
import { useState } from "react";
import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "layouts/content/ContentPage";
import useAlertScheme from "hooks/alert/useAlertScheme";
import validateWarehouse from "./validate";
import RegisterPanel from "layouts/panel/register/classic/RegisterPanel";
import ContentDivisor from "components/structured/divisor/ContentDivisor";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { TextArea } from "components/ui/inputs/textarea/TextArea";
import { ENDPOINTS } from "utils/constants/endpoints";
import { post } from "services/httpMethods";

function WarehouseRegisterCard() {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      uf: "",
      city: "",
      district: "",
      cep: "",
      additionalInfo: "",
    },
    validationSchema: validateWarehouse,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);

      let response = await post(ENDPOINTS.warehouses.create, values);

      if (response.success) {
        openAlert(response.alertType, "Sucesso", response.message);
        formik.resetForm();
      } else {
        openAlert(response.alertType, "Erro", response.message);
      }

      setLoading(false);
    },
  });

  return (
    <ContentPage title="Cadastro de Depósitos">
      <RegisterPanel
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
        <ContentDivisor title="Endereço" />
        <MDBCol>
          <TextField
            required
            label="País"
            value={formik.values.country}
            error={formik.errors.country}
            onChange={(e) => formik.setFieldValue("country", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="UF"
            width="100px"
            value={formik.values.uf}
            error={formik.errors.uf}
            onChange={(e) => formik.setFieldValue("uf", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Cidade"
            value={formik.values.city}
            error={formik.errors.city}
            onChange={(e) => formik.setFieldValue("city", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Bairro"
            value={formik.values.district}
            error={formik.errors.district}
            onChange={(e) => formik.setFieldValue("district", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="CEP"
            value={formik.values.cep}
            error={formik.errors.cep}
            onChange={(e) => formik.setFieldValue("cep", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextArea
            label="Informação Adicional"
            value={formik.values.additionalInfo}
            error={formik.errors.additionalInfo}
            onChange={(e) =>
              formik.setFieldValue("additionalInfo", e.target.value)
            }
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default WarehouseRegisterCard;
