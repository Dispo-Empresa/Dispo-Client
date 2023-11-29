import { useContext, useState, useEffect } from "react";
import { MDBCol } from "mdb-react-ui-kit";

import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { ImageField } from "../../../components/ui/inputs/image/ImageField";
import { ManufacturerFormikContext } from "../../../components/ui/context/manufacturerContext";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useFetch from "../../../hooks/useFetchApi";

function ManufacturerRegisterCard({selectedRowData, readOnly, isEdit}) {
  const [manufacturerLogo, setManufacturerLogo] = useState(null);

  const { formik, showAlert, loading, handleBeforeSubmiting, isNewRegister, setIsNewRegister } = useContext(ManufacturerFormikContext); 

  const { data } = useFetch(ENDPOINTS.manufacturers.get, selectedRowData ? selectedRowData : 0);

  setIsNewRegister(!isEdit);

  useEffect(() =>
  {
    if (selectedRowData && data) {
      formik?.setFieldValue("id", data.data.id);
      formik?.setFieldValue("name", data.data.name);
    } 
  }, [selectedRowData, data, isNewRegister]);

  return (
    <ContentPage title="Cadastro de Fabricantes">
      <RegisterPanel
        alertPanel={showAlert}
        onSubmit={formik?.handleSubmit}
        onSave={handleBeforeSubmiting}
        loading={loading}
        hideSaveButton={readOnly}
      >
        <MDBCol>
          <TextField
            required
            label="Nome do fabricante"
            value={formik?.values.name}
            error={formik?.errors.name}
            onChange={(e) => formik?.setFieldValue("name", e.target.value)}
            disabled={readOnly}
          />
        </MDBCol>
        <MDBCol>
          <ImageField
            label="Logo"
            value={manufacturerLogo}
            onChange={setManufacturerLogo}
            disabled={readOnly}
          />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ManufacturerRegisterCard;
