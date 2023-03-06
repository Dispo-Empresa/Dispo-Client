import MainContent from "../../../components/Structured/Layouts/Content/MainContent"

import { useState, useEffect } from "react"
import { handleGetAllBrandsInfo } from "../../../services/Getters/brand"
import { ActionButtons } from "../../../components/Basic/Button/Default/DefaultButton"
import { HeaderTable } from "../../../components/Structured/Table/Headers/ProductsHeader/HeaderTable"
import { DefaultTable } from "../../../components/Structured/Table/DefaultTable"

export default function BrandVisualizationCard() {
  var [records, setRecords] = useState();

  const columns = [ // Achar uma forma de melhorar isso
    {
      Header: "Name",
      accessor: "name",
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
    handleGetAllBrandsInfo()
    .then(function(res){
      setRecords(res.data);
    })
    .catch(function(err)
    {
      alert(err);
    });

  });
  
  return (
    <MainContent title="Visualização de Marcas">
      <DefaultTable title="Marcas" data={records} columns={columns} headerTable={ <HeaderTable/> } />
    </MainContent>
  );
}