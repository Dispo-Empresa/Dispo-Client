import logo from "../../assets/img/logo_sem_fundo.png";
import ContentPage from "../../layouts/content/ContentPage";

function DashboardCard() {
  return (
    <ContentPage title="Dashboard">
      <img src={logo} alt="Dispo" height={300} style={{ marginLeft: "40%" }} />
    </ContentPage>
  );
}

export default DashboardCard;
