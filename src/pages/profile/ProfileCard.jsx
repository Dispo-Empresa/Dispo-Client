import ContentPage from "layouts/content/ContentPage";
import Tabs from "components/structured/tabs/Tabs";
import ProfileTab from "./ProfileTab";
import WarehousesTab from "./WarehousesTab";

function ProfileCard() {
  const tabs = [
    { id: 1, title: "Perfil", content: <ProfileTab></ProfileTab> },
    { id: 2, title: "Depósitos", content: <WarehousesTab></WarehousesTab> },
  ];

  return (
    <ContentPage title="Perfil">
      <Tabs tabs={tabs} />
    </ContentPage>
  );
}

export default ProfileCard;
