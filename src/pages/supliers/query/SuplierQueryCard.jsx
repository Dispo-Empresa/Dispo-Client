import ContentPage from "../../../layouts/content/ContentPage";
import useFetch from "../../../hooks/useFetchApi";
import DataTable from "../../../components/structured/datagrid/Datagrid";

function SuplierQueryCard() {
  const columns = [
    { label: "Nome", field: "name", sort: false, width: 250 },
    { label: "CNPJ", field: "cnpj", sort: false, width: 250 },
    { label: "Actions", field: "actions", sort: false, width: 100 },
  ];

  const { data } = useFetch(
    "https://localhost:7153/api/v1/Providers/getAllProvidersInfo"
  );

  return (
    <ContentPage title="Fornecedores">
      <DataTable
        data={data}
        columns={columns}
        rowsPerPageOptions={[10, 20, 30]}
        rowsPerPage={10}
      />
    </ContentPage>
  );
}

export default SuplierQueryCard;
