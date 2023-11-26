import React, { useState } from "react";

import useFetch from "../../../hooks/useFetchApi";
import Datatable from "../../../components/structured/datatable/Datatable";
import ContentPage from "../../../layouts/content/ContentPage";
import ViewPanel from "../../../layouts/panel/view/ViewPanel";
import ModalCRUD from "../../../components/structured/modal/ModalCRUD";
import ProductRegisterCard from "../register/ProductRegisterCard";

import { ENDPOINTS } from "../../../utils/constants/endpoints";

function ProductQueryCard() {
  const [ selectedProducts, setSelectedProducts ] = useState(null);
  const { data, loading, refetch } = useFetch(ENDPOINTS.products.getAll);

  //Configuração para o modal funcionar{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
 
  const openModal = (row) => {   
    setSelectedRowData(row.data.id);
    setIsModalOpen(true);
  };
  //Fim da configuração}

  const columns = [
    { field: "name", header: "Nome", minWidth: "350px" },
    { field: "purchasePrice", header: "Preço de compra" },
    { field: "salePrice", header: "Preço de venda" },
    { field: "category", header: "Categoria" },
    { field: "unitOfMeasurement", header: "Unidade de Peso" },
  ];

  /*const customButtons = (row) => {
    return (
      <ButtonGroup>
        <QueryDataButton
          onClick={() => {
            alert(row.id);
          }}
        />
      </ButtonGroup>
    );
  };*/

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
          //customButtons={customButtons}
          setSelectedItens={setSelectedProducts}
          selectedItens={selectedProducts}
          onDeleteButton={deleteTest}
          onViewButton={viewTest}
          onRowClick={openModal}
        />
      </ViewPanel>  
      <ModalCRUD
        isOpen={isModalOpen}
        setShowModal={setIsModalOpen}
        title="Produtos"
        selectedRowData={selectedRowData}
      >
        <ProductRegisterCard></ProductRegisterCard>
      </ModalCRUD>           
    </ContentPage>                
  );
}

export default ProductQueryCard;
