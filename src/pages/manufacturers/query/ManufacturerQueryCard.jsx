import React, { useState } from "react";

import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datatable/Datatable";
import ContentPage from "../../../layouts/content/ContentPage";
import ViewPanel from "../../../layouts/panel/view/ViewPanel";
import { ENDPOINTS } from "../../../utils/constants/endpoints";

function ManufacturerQueryCard() {
  const [selectedManufacturers, setSelectedManufacturers] = useState(null);
  const { data, loading, refetch } = useFetch(ENDPOINTS.manufacturers.getAll);

  const columns = [{ field: "name", header: "Nome", minWidth: "350px" }];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  const viewTest = (row) => {
    alert("Vendo: " + row.id);
  };

  return (
    <ContentPage title="Fabricantes">
      <ViewPanel refreshData={refetch}>
        <Datatable
          noDataMessage="Fabricantes não encontrados"
          showCheckbox
          fromApi
          rowsPerPage={[5, 10, 25]}
          columns={columns}
          data={data}
          loading={loading}
          setSelectedItens={setSelectedManufacturers}
          selectedItens={selectedManufacturers}
          onDeleteButton={deleteTest}
          onViewButton={viewTest}
        />
      </ViewPanel>
    </ContentPage>
  );
}

export default ManufacturerQueryCard;
