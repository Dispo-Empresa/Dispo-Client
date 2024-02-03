import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useState } from "react";

import useFetch from "hooks/useFetchApi";
import Datatable from "components/structured/datatable/Datatable";
import ContentPage from "layouts/content/ContentPage";
import ViewPanel from "layouts/panel/view/ViewPanel";
import ModalCRUD from "components/structured/modal/ModalCRUD";
import ProductRegisterCard from "pages/products/register/ProductRegisterCard";
import ButtonGroup from "components/ui/buttons/group/ButtonGroup";
import { ENDPOINTS } from "utils/constants/endpoints";
import { AbstractFormContextProvider } from "context/abstractFormContext";
import { ProductContextProvider } from "context/contextProduct";
import { GenericDatabaseButton } from "components/ui/buttons/icons/IconButton";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import "./style.css";

function ProductQueryCard() {
  const { data, loading, refetch } = useFetch(ENDPOINTS.products.getAll);

  //Configuração para o modal funcionar{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const viewProducts = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(true);
    setIsEdit(false);
  };

  const editProducts = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(false);
    setIsEdit(true);
  };
  //Fim da configuração}

  const columns = [
    { field: "name", header: "Nome", minWidth: "350px", filterField: "name" },
    { field: "purchasePrice", header: "Preço de compra" },
    { field: "salePrice", header: "Preço de venda" },
    { field: "category", header: "Categoria" },
    { field: "unitOfMeasurement", header: "Unidade de Peso" },
  ];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  return (
    <ContentPage id="productView" title="Produtos">
      <Datatable
        refreshData={refetch}
        noDataMessage="Produtos não encontrados"
        fromApi
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        data={data}
        loading={loading}
        onDeleteButton={deleteTest}
        onViewButton={viewProducts}
        onEditButton={editProducts}
      />

      <AbstractFormContextProvider>
        <ProductContextProvider>
          <ModalCRUD
            isOpen={isModalOpen}
            setShowModal={setIsModalOpen}
            title="Produtos"
          >
            <ProductRegisterCard
              selectedRowData={selectedRowData}
              readOnly={readOnly}
              isEdit={isEdit}
            ></ProductRegisterCard>
          </ModalCRUD>
        </ProductContextProvider>
      </AbstractFormContextProvider>
    </ContentPage>
  );
}

export default ProductQueryCard;
