import React, { useState } from "react";
import ContentPage from "../../../layouts/content/ContentPage";
import Datatable from "../../../components/structured/datatable/Datatable";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { ContentOrderAttachmentModal } from "./ContentOrderAttachmentModal";
import ModalDialog from "../../../components/structured/modal/ModalDialog";
import getProductsData from "../attachment/Purchase";

function PurchaseOrderAttachmentFormCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const onViewButton = (rowData) => {
    // Ação ao clicar no botão de visualização (se necessário)
    console.log("Visualizar", rowData);
  };

  const onDeleteButton = (rowData) => {
    // Ação ao clicar no botão de exclusão (se necessário)
    console.log("Excluir", rowData);
  };

  const columns = [
    { field: "orderNumber", header: " Número ordem", sort: false, width: 100 },
    { field: "company", header: " Empresa", sort: false, width: 250 },
    { field: "supplier", header: " Fornecedor", sort: false, width: 250 },
    { field: "creationDate", header: " Data criação", sort: false, width: 100 },
    { field: "attachment", header: " Anexos", sort: false, width: 100 },
  ];

  const data = 
    {
      orderNumber: 123,
      company: "benner sistema",
      supplier: "mercado angelone",
      creationDate: "12/05/2045"
    }

  return (
    <ContentPage title="Anexos de ordem de compra">
      <ModalDialog title="Modal" open={showModal} onClose={() => setShowModal(false)}>
        <ContentOrderAttachmentModal />
      </ModalDialog>
      <Datatable
        showCheckbox
        columns={columns}
        data={getProductsData}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onViewButton={onViewButton}
        onDeleteButton={onDeleteButton}
      />
    </ContentPage>
  );
}

export default PurchaseOrderAttachmentFormCard;
