import MainContent from "../../../components/Structured/Layouts/Content/MainContent"

import { useState, useEffect } from "react"
import { handleGetAllProductsInfo } from "../../../services/Getters/products"
import { DefaultTable } from "../../../components/Structured/Table/MDBDataTable/DefaultTable"

export default function ProductVisualizationCard() {

  var [records, setRecords] = useState([]);
  const columns = 
  [
    { label: 'Nome', field: 'name', sort: false, width: 260,  },
    { label: 'Preço unitário', field: 'unitPrice', sort: false, width: 100 },
    { label: 'Cor', field: 'color', sort: false, width: 100 },
    { label: 'Descrição', field: 'description', sort: false, width: 400 },
    { label: 'Unidade de peso', field: 'unitOfMeasurement', sort: false, width: 100 },
    { label: 'Marca', field: 'brandId', sort: false, width: 100 },
    { label: 'Tipo', field: 'type', sort: false, width: 100 },
    { label: 'Actions', field: 'actions', sort: false, width: 100 },
  ]

  useEffect(() => { // call api only once || important to fetch data from api endpoints
    handleGetAllProductsInfo()
    .then(function(res){
      setRecords(res.data);
    })
    .catch(function(err)
    {
      console.log(err);
    });

  }, []);
  

  return (
    <MainContent title="Visualização de Produtos" cardWidth="1520px" cardHeight="820px" >
      <DefaultTable 
        data={records} 
        columns={columns} 
        rowsPerPageOptions={[10, 20, 30]} 
        rowsPerPage={10}
      />
    </MainContent>
  );
}