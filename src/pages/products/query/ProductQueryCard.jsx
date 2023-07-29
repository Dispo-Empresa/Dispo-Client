import React, { useState } from "react";

import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datatable/Datatable";
import ContentPage from "../../../layouts/content/ContentPage";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { QueryDataButton } from "../../../components/ui/buttons/icons/IconButton";

function ProductQueryCard() {
  const [selectedProducts, setSelectedProducts] = useState(null);
  const { data, loading } = useFetch(ENDPOINTS.products.getAll);

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
        <QueryDataButton
          onClick={() => {
            alert(row.id);
          }}
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
    <ContentPage title="Produtos">
      <Datatable
        noDataMessage="Produtos não encontrados"
        showCheckbox
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        data={data}
        loading={loading}
        //customButtons={customButtons}
        setSelectedItens={setSelectedProducts}
        selectedItens={selectedProducts}
        onDeleteButton={deleteTest}
        onViewButton={viewTest}
      />
    </ContentPage>
  );
}

export default ProductQueryCard;
