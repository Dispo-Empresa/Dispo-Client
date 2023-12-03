import React, { useState } from "react";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datatable/Datatable";
import ContentPage from "../../../layouts/content/ContentPage";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import ViewPanel from "../../../layouts/panel/view/ViewPanel";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { GenericDatabaseButton } from "../../../components/ui/buttons/icons/IconButton";

function ProductQueryCard() {
  const [selectedProducts, setSelectedProducts] = useState(null);
  const { data, loading, refetch } = useFetch(ENDPOINTS.products.getAll);

  const columns = [
    { field: "name", header: "Nome", minWidth: "350px" },
    { field: "purchasePrice", header: "Preço de compra" },
    { field: "salePrice", header: "Preço de venda" },
    { field: "category", header: "Categoria" },
    { field: "unitOfMeasurement", header: "Unidade de Peso" },
  ];

  const customButtons = (row) => {
    return (
      <ButtonGroup>
        <GenericDatabaseButton
          color="#4EB254"
          icon={<ToggleOnIcon />}
          title="Habilitar ordem de compra automática"
          onClick={() => {}}
        />
      </ButtonGroup>
    );
  };

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  const viewTest = (row) => {
    alert("Vendo: " + row.id);
  };

  return (
    <ContentPage id="productView" title="Produtos">
      <ViewPanel refreshData={refetch}>
        <Datatable
          noDataMessage="Produtos não encontrados"
          showCheckbox
          fromApi
          rowsPerPage={[5, 10, 25]}
          columns={columns}
          data={data}
          loading={loading}
          customButtons={customButtons}
          setSelectedItens={setSelectedProducts}
          selectedItens={selectedProducts}
          onDeleteButton={deleteTest}
          onViewButton={viewTest}
        />
      </ViewPanel>
    </ContentPage>
  );
}

export default ProductQueryCard;
