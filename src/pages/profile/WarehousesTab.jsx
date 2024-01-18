import Datatable from "components/structured/datatable/Datatable";
import useFetch from "hooks/useFetchApi";
import ViewPanel from "layouts/panel/view/ViewPanel";
import { ENDPOINTS } from "utils/constants/endpoints";
import { getAccountId } from "services/authToken";

function WarehousesTab() {
  const { data, loading } = useFetch(
    ENDPOINTS.warehouses.getWarehousesByAccountId,
    getAccountId()
  );

  const columns = [{ field: "name", header: "Nome" }];

  return (
    <ViewPanel>
      <Datatable
        fromApi
        noDataMessage="Depósitos não encontrados"
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        data={data}
        loading={loading}
      />
    </ViewPanel>
  );
}

export default WarehousesTab;
