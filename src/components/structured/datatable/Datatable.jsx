import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import ButtonGroup from "components/ui/buttons/group/ButtonGroup";
import {
  ConfirmDialog,
  confirmDialog,
} from "components/structured/dialog/ConfirmDialog";
import {
  QueryDataButton,
  DisableButton,
  EditButton,
} from "components/ui/buttons/icons/IconButton";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  RefreshButton,
  ExportButton,
} from "components/ui/buttons/icons/IconButton";

// PAGINACAO:

//Pré-carregamento de dados:

//Carregar uma quantidade maior de dados nas primeiras requisições, de modo que o cliente tenha alguns conjuntos de
//páginas disponíveis localmente. Isso pode ser útil se os usuários costumam navegar para frente e para trás nas páginas.

//Cache de dados no cliente:

//Armazenar localmente os dados já obtidos no cliente, utilizando o armazenamento local (local storage) ou outro mecanismo de cache.
//Isso pode reduzir a necessidade de buscar os mesmos dados várias vezes.

// https://codewithmukesh.com/blog/pagination-in-aspnet-core-webapi/

function Datatable({
  rowClick,
  noDataMessage,
  showCheckbox,
  rowsPerPage,
  columns,
  data,
  loading,
  customButtons,
  selectedItens,
  setSelectedItens,
  onSelectItensCallback,
  onDeleteButton,
  onViewButton,
  onEditButton,
  fromApi,
  singleSelect,
  onRowClick,
  //filterDisplay,
  //header,
  //filters,
  title,
  buttons,
  onExportButton,
  refreshData,
}) {
  const buttonsTemplate = (rowData) => {
    const acceptRemove = () => {
      onDeleteButton(rowData);
    };

    return (
      <ButtonGroup>
        {onViewButton ? (
          <QueryDataButton
            onClick={() => {
              onViewButton(rowData);
            }}
          />
        ) : null}

        {onEditButton ? (
          <EditButton
            onClick={() => {
              onEditButton(rowData);
            }}
          />
        ) : null}

        {onDeleteButton ? (
          <DisableButton
            onClick={() => {
              fromApi
                ? confirmDialog({
                    message: `Deseja desativar o item ${rowData.id}`,
                    title: "Confirmação",
                    onAccept: acceptRemove,
                  })
                : acceptRemove();
            }}
          />
        ) : null}
        {customButtons && customButtons(rowData)}
      </ButtonGroup>
    );
  };

  const onSelectItens = (e) => {
    onSelectItensCallback && onSelectItensCallback(e.value);
    setSelectedItens(e.value);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const dateTemplate = (rowData, column) => {
    const field = column.field;
    return formatDate(rowData[field]);
  };

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    purchasePrice: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    salePrice: { value: null, matchMode: FilterMatchMode.IN },
    category: { value: null, matchMode: FilterMatchMode.EQUALS },
    unitOfMeasurement: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          className="form-control filter-text-field"
          placeholder="Pesquisar..."
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
        />
        {buttons}
        {refreshData && <RefreshButton onClick={refreshData} />}
        {onExportButton && <ExportButton />}
      </div>
    );
  };

  const header = renderHeader();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  const onPageChange = (event) => {
    console.log(`Mudou para a página: ${event.page + 1}`);
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <label className="title">{title}</label>
      <hr style={{ marginBottom: "50px", width: "100%" }} />
      <ConfirmDialog />
      <DataTable
        rows={rows}
        first={first}
        onPage={onPageChange}
        globalFilterFields={["name"]}
        filterDisplay="row"
        header={header}
        filters={filters}
        alwaysShowPaginator={false}
        onRowClick={onRowClick}
        size="small"
        paginatorLeft={
          showCheckbox &&
          !singleSelect && (
            <label>
              <b>Selecionadas:</b>&nbsp;
              {selectedItens == null ? 0 : selectedItens.length}
            </label>
          )
        }
        selectionMode={!rowClick && showCheckbox ? "checkbox" : null}
        resizableColumns
        scrollable
        value={fromApi ? data && data.data : data}
        selection={selectedItens}
        onSelectionChange={(e) => onSelectItens(e)}
        paginator
        rowsPerPageOptions={rowsPerPage}
        loading={loading}
        emptyMessage={noDataMessage ?? "Nenhum resultado encontrado"}
      >
        {showCheckbox ? (
          <Column
            frozen
            selectionMode={singleSelect ? "single" : "multiple"}
            headerStyle={{ width: "3rem" }}
          />
        ) : null}
        {columns &&
          columns.map((col) => (
            <Column
              filter
              key={col.field}
              field={col.field}
              header={col.header}
              filterField={col.filterField}
              body={
                col.field.toLowerCase().includes("date")
                  ? dateTemplate
                  : col.body
              }
              headerStyle={{
                fontWeight: "700",
                minWidth: col.minWidth,
                width: col.width,
              }}
            />
          ))}
        {onDeleteButton || onViewButton || customButtons ? (
          <Column
            field="actions"
            header="Ações"
            headerStyle={{ fontWeight: "700", minWidth: "150px" }}
            frozen
            alignFrozen="right"
            body={buttonsTemplate}
          />
        ) : null}
      </DataTable>
    </div>
  );
}

export default Datatable;
