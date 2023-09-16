import Datatable from "../../../components/structured/datatable/Datatable";
import useFetch from "../../../hooks/useFetchApi";
import ContentPage from "../../../layouts/content/ContentPage";
import ViewPanel from "../../../layouts/panel/view/ViewPanel";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

function WarehouseQueryCard() {
  const columns = [
    { field: "name", header: "Nome", minWidth: "350px" },
    { field: "address", header: "Endereço" },
  ];

  const { data, loading, refetch } = useFetch(
    ENDPOINTS.warehouses.getWithAdress
  );

  return (
    <ContentPage title="Depósitos">
      <ViewPanel refreshData={refetch}>
        <Datatable
          fromApi
          noDataMessage="Depósitos não encontrados"
          rowsPerPage={[5, 10, 25]}
          columns={columns}
          data={data}
          loading={loading}
        />
      </ViewPanel>
    </ContentPage>
  );
}

export default WarehouseQueryCard;
