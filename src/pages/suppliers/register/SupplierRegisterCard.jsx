import { useState } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "../../../hooks/alert/useAlertScheme";
import ContentDivisor from "../../../components/structured/divisor/ContentDivisor";
import validate from "./validate";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { PhoneField } from "../../../components/ui/inputs/masked/PhoneField";
import { cnpjFormater } from "../../../utils/format/cnpjFormat";
import { TextArea } from "../../../components/ui/inputs/textarea/TextArea";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { post } from "../../../services/httpMethods";

function SupplierRegisterCard() {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      contactName: "",
      contactTitle: "",
      cnpj: "",
      email: "",
      phone: "",

      // adresses

      country: "",
      uf: "",
      city: "",
      district: "",
      cep: "",
      additionalInfo: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);

      var dataAddress = {
        country: values.country,
        uf: values.uf,
        city: values.city,
        district: values.district,
        cep: values.cep,
        additionalInfo: values.additionalInfo,
      };

      var data = {
        name: values.name,
        contactName: values.contactName,
        contactTitle: values.contactTitle,
        cnpj: values.cnpj,
        email: values.email,
        phone: values.phone,
        address: dataAddress,
      };

      var response = await post(ENDPOINTS.suppliers.createSupplier, data);

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
    if (formik.errors) {
      openAlert("error", "Existem campos com erro, por favor verifique!");
      return;
    }
  };

  return (
    <ContentPage title="Cadastro de Fornecedores">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSubmit={formik.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
      >
        <MDBCol>
          <TextField
            required
            label="Nome do Fornecedor"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Nome do Representante"
            value={formik.values.contactName}
            error={formik.errors.contactName}
            onChange={(e) =>
              formik.setFieldValue("contactName", e.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="Título do Representante"
            value={formik.values.contactTitle}
            error={formik.errors.contactTitle}
            onChange={(e) =>
              formik.setFieldValue("contactTitle", e.target.value)
            }
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            value={cnpjFormater(formik.values.cnpj)}
            error={formik.errors.cnpj}
            onChange={(e) => formik.setFieldValue("cnpj", e.target.value)}
          />
        </MDBCol>
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
          <PhoneField
            required
            label="Telefone"
            placeholder="+55 (00) 0 0000-0000"
            value={formik.values.phone}
            error={formik.errors.phone}
            onChange={(e) => formik.setFieldValue("phone", e.target.value)}
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

export default SupplierRegisterCard;
