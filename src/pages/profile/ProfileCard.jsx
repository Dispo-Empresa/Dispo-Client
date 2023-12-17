import ContentPage from "layouts/content/ContentPage";
import Tabs from "components/structured/tabs/Tabs";

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
