import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../layouts/content/ContentPage";
import Registration from "../../layouts/panel/register-panel/RegisterPanel";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetchApi";
import TextField from "../../components/ui/textfields/form/TextField";
import { loggedAccountId } from "../../data/storage/user";

function ProfileCard() {
  const { data } = useFetch(
    "https://localhost:7153/api/v1/UserAccount/getAllUserInfo/" +
      loggedAccountId()
  );
  const { handleInputChange } = useForm(null);

  return (
    data && (
      <ContentPage title="Perfil" alertMessage={null}>
        <Registration width="1000px">
          <MDBRow className="g-5">
            <MDBCol>
              <TextField
                label="E-mail"
                value={data.data.email}
                onChange={handleInputChange}
              />
            </MDBCol>
            <MDBCol>
              <TextField
                label="FirstName"
                value={data.data.firstName}
                onChange={handleInputChange}
              />
            </MDBCol>
            <MDBCol>
              <TextField
                label="LastName"
                value={data.data.lastName}
                onChange={handleInputChange}
              />
            </MDBCol>
            <MDBCol>
              <TextField
                label="CpfCnpj"
                value={data.data.cpfCnpj}
                onChange={handleInputChange}
              />
            </MDBCol>
            <MDBCol>
              <TextField
                label="Phone"
                value={data.data.phone}
                onChange={handleInputChange}
              />
            </MDBCol>
            <MDBCol>
              <TextField
                label="BirthDate"
                value={data.data.birthDate}
                onChange={handleInputChange}
              />
            </MDBCol>
          </MDBRow>
        </Registration>
      </ContentPage>
    )
  );
}

export default ProfileCard;
