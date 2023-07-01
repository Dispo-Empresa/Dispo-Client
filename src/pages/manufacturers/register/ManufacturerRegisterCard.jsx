import { MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../../layouts/content/ContentPage";
import RegisterPanel from "../../../layouts/panel/register/classic/RegisterPanel";
import useFields from "./useFields";
import { TextField } from "../../../components/ui/inputs/textfield/TextField";
import { ImageField } from "../../../components/ui/inputs/image/ImageField";

function ManufacturerRegisterCard() {
  const [fields, errors, handleFieldChange] = useFields();

  return (
    <ContentPage title="Cadastro de Fabricantes">
      <RegisterPanel>
        <MDBCol>
          <TextField
            required
            label="Nome"
            value={fields.name}
            error={errors.name}
            onChange={(value) => handleFieldChange("name", value.target.value)}
          />
        </MDBCol>
        <MDBCol>
          <ImageField label="Logo" />
        </MDBCol>
      </RegisterPanel>
    </ContentPage>
  );
}

export default ManufacturerRegisterCard;
