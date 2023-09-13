import React, { useState } from "react";

import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datatable/Datatable";
import ContentPage from "../../../layouts/content/ContentPage";
import ViewPanel from "../../../layouts/panel/view/ViewPanel";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

function SupplierQueryCard() {
  const [selectedSuppliers, setSelectedSuppliers] = useState(null);
  const { data, loading, refetch } = useFetch(ENDPOINTS.suppliers.getAll);

  const columns = [
    { field: "name", header: "Nome", minWidth: "350px" },
    { field: "contactName", header: "Responsável" },
    { field: "Cnpj", header: "CNPJ" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
  ];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  const viewTest = (row) => {
    alert("Vendo: " + row.id);
  };

  return (
    <ContentPage title="Fornecedores">
      <ViewPanel refreshData={refetch}>
        <Datatable
          noDataMessage="Fornecedores não encontrados"
          showCheckbox
          fromApi
          rowsPerPage={[5, 10, 25]}
          columns={columns}
          data={data}
          loading={loading}
          setSelectedItens={setSelectedSuppliers}
          selectedItens={selectedSuppliers}
          onDeleteButton={deleteTest}
          onViewButton={viewTest}
        />
      </ViewPanel>
    </ContentPage>
  );
}

export default SupplierQueryCard;
