import { useContext, useEffect } from "react";
import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "layouts/content/ContentPage";
import RegisterPanel from "layouts/panel/register/classic/RegisterPanel";
import useFetch from "hooks/useFetchApi";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { PhoneField } from "components/ui/inputs/masked/PhoneField";
import { cnpjFormater } from "utils/format/cnpjFormat";
import { ENDPOINTS } from "utils/constants/endpoints";
import { SupplierFormikContext } from "context/supplierContext";

function SupplierRegisterCard({ selectedRowData, readOnly, isEdit }) {
  const {
    formik,
    showAlert,
    loading,
    handleBeforeSubmiting,
    isNewRegister,
    setIsNewRegister,
  } = useContext(SupplierFormikContext);
  const { data } = useFetch(
    ENDPOINTS.suppliers.get,
    selectedRowData ? selectedRowData : 0
  );

  setIsNewRegister(!isEdit);

  useEffect(() => {
    if (selectedRowData && data) {
      formik?.setFieldValue("id", data.data.id);
      formik?.setFieldValue("name", data.data.name);
      formik?.setFieldValue("contactName", data.data.contactName);
      formik?.setFieldValue("contactTitle", data.data.contactTitle);
      formik?.setFieldValue("cnpj", data.data.cnpj);
      formik?.setFieldValue("email", data.data.email);
      formik?.setFieldValue("phone", data.data.phone);
    }
  }, [selectedRowData, data, isNewRegister]);

  return (
    <ContentPage title="Cadastro de Fornecedores">
      <RegisterPanel
        alertPanel={showAlert}
        title="Informações Básicas"
        onSubmit={formik.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
        hideSaveButton={readOnly}
      >
        <MDBCol>
          <TextField
            required
            label="Nome do Fornecedor"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            disabled={readOnly}
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
            disabled={readOnly}
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
            disabled={readOnly}
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
            disabled={readOnly}
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
            disabled={readOnly}
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
            disabled={readOnly}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default SupplierRegisterCard;
