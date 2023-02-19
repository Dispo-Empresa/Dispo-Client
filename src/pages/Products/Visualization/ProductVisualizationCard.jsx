import Sidebar from "../../../components/Structured/Sidebar/Sidebar"

import { useState, useEffect } from "react"
import { BACKGROUNDS } from "../../../config/defaultColors"
import { handleGetAllProductsInfo } from "../../../services/Getters/products"
import { ActionButtons } from "../../../components/Basic/Button/Default/DefaultButton"
import { HeaderTable } from "../../../components/Structured/Table/Headers/ProductsHeader/HeaderTable"
import { DefaultTable } from "../../../components/Structured/Table/DefaultTable"
import { Card, CardContent } from '@material-ui/core';

export default function ProductVisualizationCard() {

  var [records, setRecords] = useState();
  const columns = [ // Achar uma forma de melhorar isso
    {
      Header: "Name",
      accessor: "name",
      width: 300
    },
    {
      Header: "UnitPrice",
      accessor: "unitPrice",
      width: 200
    },
    {
      Header: "Color",
      accessor: "color",
      width: 50
    },
    {
      Header: "Description",
      accessor: "description",
      width: 200
    },
    {
      Header: "UnitOfMeasurement",
      accessor: "unitOfMeasurement",
      width: 50
    },
    {
      Header: "Type",
      accessor: "type",
      width: 50
    },
    {
      Header: "BrandId",
      accessor: "brandId",
      width: 50
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
    handleGetAllProductsInfo()
    .then(function(res){
      setRecords(res.data);
    })
    .catch(function(err)
    {
      alert(err);
    });

  }, []);
  
  return (
    <div style={{ backgroundColor: BACKGROUNDS.WhiteTheme }}>
      <Sidebar contentTitle="Visualização de Produtos" contentMarginLeft="4%">
        <div style={{ marginLeft: "4%" }}>
          <Card>
            <CardContent>
              <DefaultTable title="Produtos" data={records} columns={columns} headerTable={ <HeaderTable /> } />
            </CardContent>
          </Card>
        </div>
      </Sidebar>
    </div>
  );
}