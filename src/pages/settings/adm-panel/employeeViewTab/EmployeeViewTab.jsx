import useFetch from "../../../../hooks/useFetchApi";
import Datatable from "../../../../components/structured/datatable/Datatable";
import ViewPanel from "../../../../layouts/panel/view/ViewPanel";

import { ENDPOINTS } from "../../../../utils/constants/endpoints";

function EmployeeViewTab() {
  const { data, loading, refetch } = useFetch(ENDPOINTS.adm.employees);

  const columns = [
    { field: "email", header: "Email" },
    { field: "roleName", header: "Cargo" },
    { field: "fullName", header: "Nome" },
    { field: "phone", header: "Telefone" },
  ];

  const viewTest = (row) => {
    alert("Vendo: " + row.accountId);
  };

  return (
    <ViewPanel refreshData={refetch}>
      <Datatable
        fromApi
        noDataMessage="Colaboradores não encontrados"
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        data={data}
        loading={loading}
        onViewButton={viewTest}
      />
    </ViewPanel>
  );
}

export default EmployeeViewTab;
