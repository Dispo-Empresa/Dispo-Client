import { useState } from "react";

import useFetch from "hooks/useFetchApi";
import Datatable from "components/structured/datatable/Datatable";
import ContentPage from "layouts/content/ContentPage";
import ViewPanel from "layouts/panel/view/ViewPanel";
import ModalCrud from "components/structured/modal/ModalCRUD";
import SupplierRegisterCard from "pages/suppliers/register/SupplierRegisterCard";
import { ENDPOINTS } from "utils/constants/endpoints";
import { AbstractFormContextProvider } from "context/abstractFormContext";
import { SupplierContextProvider } from "context/supplierContext";

function SupplierQueryCard() {
  const [selectedSuppliers, setSelectedSuppliers] = useState(null);

  //Configuração para o modal funcionar{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const viewSupplier = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(true);
    setIsEdit(false);
  };

  const editSupplier = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(false);
    setIsEdit(true);
  };
  //Fim da configuração}

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

  return (
    <ContentPage title="Fornecedores">
      <Datatable
        noDataMessage="Fornecedores não encontrados"
        showCheckbox
        fromApi
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        setSelectedItens={setSelectedSuppliers}
        selectedItens={selectedSuppliers}
        onDeleteButton={deleteTest}
        onViewButton={viewSupplier}
        onEditButton={editSupplier}
        entity="supplier"
      />

      <AbstractFormContextProvider>
        <SupplierContextProvider>
          <ModalCrud
            isOpen={isModalOpen}
            setShowModal={setIsModalOpen}
            title="Fornecedor"
          >
            <SupplierRegisterCard
              selectedRowData={selectedRowData}
              readOnly={readOnly}
              isEdit={isEdit}
            ></SupplierRegisterCard>
          </ModalCrud>
        </SupplierContextProvider>
      </AbstractFormContextProvider>
    </ContentPage>
  );
}

export default SupplierQueryCard;
