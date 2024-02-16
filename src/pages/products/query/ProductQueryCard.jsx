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
import { InputNumber } from "primereact/inputnumber";
import { SelectProductCategory } from "components/ui/inputs/select/SelectProduct";

import "./style.css";

function ProductQueryCard() {
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

  // CONTINUAR COM OS FILTROS COM TEMPLATE

  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="BRL"
        locale="pt-BR"
      />
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <SelectProductCategory
        hideLabel
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const columns = [
    { field: "name", header: "Nome", minWidth: "350px", filterField: "name" },
    {
      field: "purchasePrice",
      header: "Preço de compra",
      filterElement: balanceFilterTemplate,
    },
    {
      field: "salePrice",
      header: "Preço de venda",
      filterElement: balanceFilterTemplate,
    },
    {
      field: "category",
      header: "Categoria",
      filterElement: statusRowFilterTemplate,
    },
    { field: "unitOfMeasurement", header: "Unidade de Peso" },
  ];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  return (
    <ContentPage id="productView" title="Produtos">
      <Datatable
        noDataMessage="Produtos não encontrados"
        fromApi
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        onDeleteButton={deleteTest}
        onViewButton={viewProducts}
        onEditButton={editProducts}
        entity="product"
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
