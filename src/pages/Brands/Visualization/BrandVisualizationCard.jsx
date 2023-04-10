import MainContent from "../../../components/Structured/Layouts/Content/MainContent"

import { useState, useEffect } from "react"
import { handleGetAllBrandsInfo } from "../../../services/Getters/brand"
import { DefaultTable } from "../../../components/Structured/Table/MDBDataTable/DefaultTable"

export default function BrandVisualizationCard() {
  var [records, setRecords] = useState();
  
  const columns = 
  [
    { label: 'Nome', field: 'name', sort: false, width: 250,  },
    { label: 'Actions', field: 'actions', sort: false, width: 100 },
  ]

  useEffect(() => { // call api only once || important to fetch data from api endpoints

    handleGetAllBrandsInfo()
    .then(function(res){
      setRecords(res.data);
    })
    .catch(function(err)
    {
      alert(err);
    });

  }, []);
  
  return (
    <MainContent title="Visualização de Marcas">
      <DefaultTable 
        data={records} 
        columns={columns}
        rowsPerPageOptions={[10, 20, 30]} 
        rowsPerPage={10} 
      />
    </MainContent>
  );
}