import React, { useState } from "react";
import ContentPage from "../../../layouts/content/ContentPage";
import ModalDialog from "../../../components/structured/modal/ModalDialog";
import ButtonGroup from "../../../components/ui/buttons/group/ButtonGroup";
import { QueryDataButton } from "../../../components/ui/buttons/icons/IconButton"
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import FileUploader from "../attachment/FileUploader";

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

  const buttonsTemplate = (rowData) => {
    return (
      <ButtonGroup>
        <QueryDataButton
          onClick={() => {
            setShowModal(true);
          }}
        />
      </ButtonGroup>
    );
  };

  const columns = [
    { field: "orderNumber", header: " Número ordem", sort: false, width: 100 },
    { field: "company", header: " Empresa", sort: false, width: 250 },
    { field: "supplier", header: " Fornecedor", sort: false, width: 250 },
    { field: "creationDate", header: " Data criação", sort: false, width: 100 }
  ];

  const data = [
    {
      orderNumber: "PO-001",
      company: "Empresa A",
      supplier: "Fornecedor X",
      creationDate: "2023-08-21", // A data deve estar no formato correto, como "YYYY-MM-DD"
    },
    {
      orderNumber: "PO-002",
      company: "Empresa B",
      supplier: "Fornecedor Y",
      creationDate: "2023-08-22",
    },
    {
      orderNumber: "PO-003",
      company: "Empresa C",
      supplier: "Fornecedor Z",
      creationDate: "2023-08-23",
    },
  ];

  return (
    <ContentPage title="Anexos de ordem de compra">
      <ModalDialog title="Anexos" open={showModal} onClose={() => setShowModal(false)}>
       <FileUploader></FileUploader>
      </ModalDialog>
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column
          field="actions"
          header="Ações"
          headerStyle={{ minWidth: "180px" }}
          frozen
          alignFrozen="right"
          body={buttonsTemplate}
        />
      </DataTable>
    </ContentPage>
  );
}

export default PurchaseOrderAttachmentFormCard;
