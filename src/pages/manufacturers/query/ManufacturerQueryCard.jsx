import { useState } from "react";

import useFetch from "hooks/useFetchApi";
import Datatable from "components/structured/datatable/Datatable";
import ContentPage from "layouts/content/ContentPage";
import ViewPanel from "layouts/panel/view/ViewPanel";
import ManufacturerRegisterCard from "pages/manufacturers/register/ManufacturerRegisterCard";
import ModalCrud from "components/structured/modal/ModalCRUD";
import { ENDPOINTS } from "utils/constants/endpoints";
import { AbstractFormContextProvider } from "context/abstractFormContext";
import { ManufacturerContextProvider } from "context/manufacturerContext";

function ManufacturerQueryCard() {
  const [selectedManufacturers, setSelectedManufacturers] = useState(null);

  //Configuração para o modal funcionar{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const viewManufacturer = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(true);
    setIsEdit(false);
  };

  const editManufacturer = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(false);
    setIsEdit(true);
  };
  //Fim da configuração}

  const columns = [{ field: "name", header: "Nome", minWidth: "350px" }];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  return (
    <ContentPage title="Fabricantes">
      <Datatable
        noDataMessage="Fabricantes não encontrados"
        showCheckbox
        fromApi
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        setSelectedItens={setSelectedManufacturers}
        selectedItens={selectedManufacturers}
        onDeleteButton={deleteTest}
        onViewButton={viewManufacturer}
        onEditButton={editManufacturer}
        entity="manufacturer"
      />

      <AbstractFormContextProvider>
        <ManufacturerContextProvider>
          <ModalCrud
            isOpen={isModalOpen}
            setShowModal={setIsModalOpen}
            title="Fabricante"
          >
            <ManufacturerRegisterCard
              selectedRowData={selectedRowData}
              readOnly={readOnly}
              isEdit={isEdit}
            ></ManufacturerRegisterCard>
          </ModalCrud>
        </ManufacturerContextProvider>
      </AbstractFormContextProvider>
    </ContentPage>
  );
}

export default ManufacturerQueryCard;
