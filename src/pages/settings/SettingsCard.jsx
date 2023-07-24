import ContentPage from "../../layouts/content/ContentPage";
import Tabs from "../../components/structured/tabs/Tabs";
import UserRegisterTab from "../settings/adm-settings/UserRegisterTab";

function SettingsCard() {
  const tabs = [
    { id: 1, title: "Cadastro de colaborador", content: <UserRegisterTab /> },
    { id: 2, title: "Visão dos colaboradores", content: <div /> },
  ];

  return (
    <div>
      <ContentPage title="Painel ADM" height="350px" dividerOff>
        <Tabs tabs={tabs} />
      </ContentPage>
      <ContentPage title="Configurações" height="350px"></ContentPage>
    </div>
  );
}

export default SettingsCard;
