import React from "react"

import logo from "../../assets/img/logo/DispoLogo.png"
import Main from "../../layouts/content/Main"

function Dashboard() {

    return (
        <Main title="Dashboard" cardHeight="400px">
            <img src={logo} alt="Dispo" width="350" height="350" style={{ marginLeft: "30%" }} />
        </Main>
    );
}

export default Dashboard;