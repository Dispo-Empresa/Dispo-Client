import React from "react"
import Sidebar from "../../components/Structured/Sidebar/Sidebar"
import logo from "../../assets/DispoLogo.png"

import { BACKGROUNDS } from "../../config/defaultColors"
import { Card, CardContent } from '@material-ui/core';

export default function HomeCard() {
  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="" contentMarginLeft="4%">
        <div style={{ marginLeft: "23%", width: "800px" }}>
          <Card>
            <CardContent>
              <img src={logo} alt="Dispo" width="350" height="350" style={{ marginLeft: "25%" }} />
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}