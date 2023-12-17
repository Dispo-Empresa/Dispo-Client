import { useState } from "react";

import Datatable from "components/structured/datatable/Datatable";
import ContentPage from "layouts/content/ContentPage";
import ViewPanel from "layouts/panel/view/ViewPanel";
import useFetch from "hooks/useFetchApi";
import { ENDPOINTS } from "utils/constants/endpoints";

function PurchaseOrderQueryCard() {
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const { data, loading, refetch } = useFetch(ENDPOINTS.purchaseorder.getAll);

  console.log(data);

  //Configuração para o modal funcionar{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const viewPurchaseOrder = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(true);
    setIsEdit(false);
  };

  const editPurchaseOrder = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(false);
    setIsEdit(true);
  };
  //Fim da configuração}

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  const columns = [
    { field: "number", header: "Número da ordem", minWidth: "350px" },
    //{ field: "supplier", header: "Fornecedor" },
    { field: "creationDate", header: "Data de criação" },
    { field: "orders", header: "Produto" },
    { field: "totalPrice", header: "Valor total" },
  ];

  return (
    <ContentPage title="Order de compra">
      <ViewPanel refreshData={refetch}>
        <Datatable
          noDataMessage="Nenhuma ordem de compra encontrada!"
          showCheckbox
          fromApi
          rowsPerPage={[5, 10, 25]}
          columns={columns}
          data={data}
          loading={loading}
          setSelectedItens={setSelectedPurchaseOrder}
          selectedItens={selectedPurchaseOrder}
          onDeleteButton={deleteTest}
          onViewButton={viewPurchaseOrder}
          onEditButton={editPurchaseOrder}
        />
      </ViewPanel>
    </ContentPage>
  );
}

export default PurchaseOrderQueryCard;
