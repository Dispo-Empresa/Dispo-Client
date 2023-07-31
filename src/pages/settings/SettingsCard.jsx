import ContentPage from "../../layouts/content/ContentPage";
import Tabs from "../../components/structured/tabs/Tabs";
import EmployeeRegisterTab from "../settings/adm-panel/employeeRegisterTab/EmployeeRegisterTab";
import EmployeeViewTab from "../settings/adm-panel/employeeViewTab/EmployeeViewTab";
import { isRoleManager } from "../../services/role-auth";

function SettingsCard() {
  const tabs = [
    {
      id: 1,
      title: "Cadastro de colaborador",
      content: <EmployeeRegisterTab />,
    },
    { id: 2, title: "Visão dos colaboradores", content: <EmployeeViewTab /> },
  ];

  return (
    <div>
      {isRoleManager() && (
        <ContentPage title="Painel ADM" height="350px" dividerOff>
          <Tabs tabs={tabs} />
        </ContentPage>
      )}
      <ContentPage title="Configurações" height="350px"></ContentPage>
    </div>
  );
}

export default SettingsCard;
