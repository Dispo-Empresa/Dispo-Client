import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datagrid/Datagrid";
import ContentPage from "../../../layouts/content/ContentPage";

function ProductQueryCard() {
  const columns = [
    { label: "Logo", field: "unitPrice", sort: false, width: 100 },
    { label: "Nome", field: "name", sort: false, width: 260 },
  ];

  //const { data } = useFetch("Products/getAllProducts");

  return (
    <ContentPage title="Fabricantes">
      <Datatable
        //data={data}
        columns={columns}
        rowsPerPageOptions={[10, 20, 30]}
        rowsPerPage={10}
      />
    </ContentPage>
  );
}

export default ProductQueryCard;
