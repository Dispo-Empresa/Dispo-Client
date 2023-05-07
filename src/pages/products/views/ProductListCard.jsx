import ContentPage from "../../../layouts/content/ContentPage";
import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datagrid/Datagrid";

function ProductListCard() {
  const columns = [
    { label: "Nome", field: "name", sort: false, width: 260 },
    { label: "Preço unitário", field: "unitPrice", sort: false, width: 100 },
    { label: "Cor", field: "color", sort: false, width: 100 },
    { label: "Descrição", field: "description", sort: false, width: 400 },
    {
      label: "Unidade de peso",
      field: "unitOfMeasurement",
      sort: false,
      width: 100,
    },
    { label: "Marca", field: "brandId", sort: false, width: 100 },
    { label: "Tipo", field: "type", sort: false, width: 100 },
    { label: "Actions", field: "actions", sort: false, width: 100 },
  ];

  const { data } = useFetch(
    "https://localhost:7153/api/v1/Products/getAllProductsInfo"
  );

  return (
    <ContentPage
      title="Visualização de Produtos"
      cardWidth="1400px"
      cardHeight="600px"
    >
      <Datatable
        data={data}
        columns={columns}
        rowsPerPageOptions={[10, 20, 30]}
        rowsPerPage={10}
      />
    </ContentPage>
  );
}

export default ProductListCard;
