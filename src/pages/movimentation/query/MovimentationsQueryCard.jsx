import { Tag } from "primereact/tag";

import useFetch from "hooks/useFetchApi";
import Datatable from "components/structured/datatable/Datatable";
import ContentPage from "layouts/content/ContentPage";
import ViewPanel from "layouts/panel/view/ViewPanel";
import { ENDPOINTS } from "utils/constants/endpoints";

function ProductMovimentationsQueryCard() {
  const { data, loading, refetch } = useFetch(ENDPOINTS.movements.getAll);

  const typeBodyTemplate = (movement) => {
    return (
      <Tag
        value={getTypeLabel(movement.type)}
        severity={getSeverity(movement.type)}
      />
    );
  };

  const getTypeLabel = (movementType) => {
    switch (movementType) {
      case 0:
        return "Entrada";

      case 1:
        return "Saida";

      default:
        return "N/DA";
    }
  };

  const getSeverity = (movementType) => {
    switch (movementType) {
      case 0:
        return "success";

      case 1:
        return "warning";

      default:
        return null;
    }
  };

  const columns = [
    {
      field: "type",
      header: "Tipo",
      body: typeBodyTemplate,
      minWidth: "50px",
    },
    { field: "productName", header: "Produto" },
    { field: "date", header: "Data" },
    { field: "quantity", header: "Quantidade" },
  ];

  return (
    <ContentPage id="movimentationsView" title="Movimentações">
      <ViewPanel refreshData={refetch}>
        <Datatable
          noDataMessage="Movimentações não encontradas"
          showCheckbox
          fromApi
          rowsPerPage={[5, 10, 25]}
          columns={columns}
          data={data}
          loading={loading}
        />
      </ViewPanel>
    </ContentPage>
  );
}

export default ProductMovimentationsQueryCard;
