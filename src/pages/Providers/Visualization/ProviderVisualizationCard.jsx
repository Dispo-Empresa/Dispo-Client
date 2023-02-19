import Sidebar from "../../../components/Structured/Sidebar/Sidebar"

import { useState, useEffect } from "react"
import { BACKGROUNDS } from "../../../config/defaultColors"
import { handleGetAllProvidersInfo } from "../../../services/Providers/providersServices"
import { ActionButtons } from "../../../components/Basic/Button/Default/DefaultButton"
import { HeaderTable } from "../../../components/Structured/Table/Headers/ProductsHeader/HeaderTable"
import { DefaultTable } from "../../../components/Structured/Table/DefaultTable"
import { Card, CardContent } from '@material-ui/core';

export default function ProviderVisualizationCard() {

  var [records, setRecords] = useState();
  const columns = [ // Achar uma forma de melhorar isso
    {
      Header: "Name",
      accessor: "name",
      width: 300
    },
    {
      Header: "CNPJ",
      accessor: "cnpj",
      width: 300
    },
    {
      Header: "Actions",
      accessor: "actions",
      width: 250,
      Cell: () => (
        <ActionButtons hrefSearch="/" hrefEdit="/" onClickRemove={() => { alert("removendo") }} />
      )
    }
  ];

  useEffect(() => { // call api only once || important to fetch data from api endpoints
    handleGetAllProvidersInfo()
    .then(function(res){
      console.log(res)
      setRecords(res.data.data);
    })
    .catch(function(err)
    {
      alert(err);
    });

  }, []);
  
  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="Visualização de Fornecedores" contentMarginLeft="4%">
        <div style={{ marginLeft: "4%" }}>
          <Card>
            <CardContent>
              <DefaultTable title="Fornecedores" data={records} columns={columns} headerTable={ <HeaderTable /> } />
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}