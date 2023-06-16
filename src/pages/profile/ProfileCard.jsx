import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import ContentPage from "../../layouts/content/ContentPage";
import Registration from "../../layouts/panel/register-panel/RegisterPanel";
import useFetch from "../../hooks/useFetchApi";
import TextField from "../../components/ui/textfields/form/TextField";
import Tabs from "../../components/structured/tabs/Tabs";

function ProfileCard() {
  const tabs = [
    { id: 1, title: "Perfil", content: <></> },
    { id: 2, title: "Depósitos", content: <></> },
  ];

  return (
    <ContentPage title="Perfil">
      <Tabs tabs={tabs} />
    </ContentPage>
  );
}

export default ProfileCard;
