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
import { AbstractFormContextProvider } from "components/ui/context/abstractFormContext";
import { ProductContextProvider } from "components/ui/context/contextProduct";
import { GenericDatabaseButton } from "components/ui/buttons/icons/IconButton";

function ProductQueryCard() {
  const [selectedProducts, setSelectedProducts] = useState(null);
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
    { field: "name", header: "Nome", minWidth: "350px" },
    { field: "purchasePrice", header: "Preço de compra" },
    { field: "salePrice", header: "Preço de venda" },
    { field: "category", header: "Categoria" },
    { field: "unitOfMeasurement", header: "Unidade de Peso" },
  ];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

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
          onViewButton={viewProducts}
          onEditButton={editProducts}
        />
      </ViewPanel>

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
