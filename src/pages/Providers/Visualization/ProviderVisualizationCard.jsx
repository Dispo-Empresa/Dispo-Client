import MainContent from "../../../components/Structured/Layouts/Content/MainContent"

import { useState, useEffect } from "react"
import { handleGetAllProvidersInfo } from "../../../services/Providers/providersServices"
import { DefaultTable } from "../../../components/Structured/Table/MDBDataTable/DefaultTable"

export default function ProviderVisualizationCard() {

  var [records, setRecords] = useState();
  const columns = 
  [
    { label: 'Nome', field: 'name', sort: false, width: 250,  },
    { label: 'CNPJ', field: 'cnpj', sort: false, width: 250 },
    { label: 'Actions', field: 'actions', sort: false, width: 100 },
  ]

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
    <MainContent title="Visualização de Fornecedores">
      <DefaultTable 
        data={records} 
        columns={columns}
        rowsPerPageOptions={[10, 20, 30]} 
        rowsPerPage={10}
      />
    </MainContent>
  );
}