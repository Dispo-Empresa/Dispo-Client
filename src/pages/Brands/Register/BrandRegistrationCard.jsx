import React from "react"
import Sidebar from "../../../components/Structured/Sidebar/Sidebar"

import { useState } from "react";
import { BACKGROUNDS, COLORS } from "../../../config/defaultColors"
import { DefaultButton } from "../../../components/Basic/Button/Default/DefaultButton";
import { DefaultTextField } from "../../../components/Basic/TextField/TextField";
import { handleRegisterBrand } from "../../../services/Brand/brandServices"
import { Box, Card, CardContent } from '@material-ui/core';

export default function BrandRegistrationCard() {

  const [brandName, setBrandName] = useState();

  const RegisterBrand = () => {

    var data = {
      name: brandName
    };

    handleRegisterBrand(data)
      .then(function(res){
        alert(res);
      })
      .catch(function(err){
        alert(err);
      })
  };

  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="Cadastro de Marca" contentMarginLeft="4%">
        <div style={{ marginLeft: "4%", width: "1400px" }}>
          <Card>
            <CardContent>
              <div class="container">
                <div class="content">
                  <form action="#">
                    <div class="user-details">
                      <div class="input-box">
                        <Box paddingTop={5}>
                          <DefaultTextField label="Informe a marca" variant="outlined" type="text" 
                                    value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                        </Box>
                      </div>
                    </div>
                  </form>
                  <div>
                    <Box paddingTop={3} paddingBottom={5}>
                      <DefaultButton backgroundColor={COLORS.PrimaryColor} title="Cadastrar marca" width="250px" height="50px"  
                                      onClick={RegisterBrand} />
                    </Box>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}