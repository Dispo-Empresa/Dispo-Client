import React from "react";

import logo from "../../assets/img/logo/DispoLogo.png";
import ContentPage from "../../layouts/content/ContentPage";

function DashboardCard() {
  return (
    <ContentPage title="Dashboard">
      <img
        src={logo}
        alt="Dispo"
        width="350"
        style={{
          marginTop: "5%",
          marginLeft: "36%",
        }}
      />
    </ContentPage>
  );
}

export default DashboardCard;
