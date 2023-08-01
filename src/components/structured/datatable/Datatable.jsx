import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import ButtonGroup from "../../ui/buttons/group/ButtonGroup";
import {
  QueryDataButton,
  DeleteButton,
} from "../../ui/buttons/icons/IconButton";

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
  onDeleteButton,
  onViewButton,
}) {
  const buttonsTemplate = (rowData) => {
    return (
      <ButtonGroup>
        {onViewButton ? (
          <QueryDataButton
            onClick={() => {
              onViewButton(rowData);
            }}
          />
        ) : null}
        {onDeleteButton ? (
          <DeleteButton
            onClick={() => {
              onDeleteButton(rowData);
            }}
          />
        ) : null}
        {customButtons && customButtons(rowData)}
      </ButtonGroup>
    );
  };

  return (
    <DataTable
      size="small"
      paginatorLeft={
        showCheckbox ? (
          <label>
            <b>Selecionadas:</b>&nbsp;
            {selectedItens == null ? 0 : selectedItens.length}
          </label>
        ) : (
          <></>
        )
      }
      selectionMode={!rowClick && showCheckbox ? "checkbox" : null}
      resizableColumns
      showGridlines
      scrollable
      value={data && data.data}
      selection={selectedItens}
      onSelectionChange={(e) => setSelectedItens(e.value)}
      paginator
      rows={rowsPerPage != null ? rowsPerPage[0] : 5}
      rowsPerPageOptions={rowsPerPage}
      loading={loading}
      emptyMessage={noDataMessage ?? "Nenhum resultado encontrado"}
      tableStyle={{
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      {showCheckbox ? (
        <Column
          frozen
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        />
      ) : null}
      {columns &&
        columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            headerStyle={{ minWidth: col.minWidth ?? "250px" }}
          />
        ))}
      {onDeleteButton || onViewButton || customButtons ? (
        <Column
          field="actions"
          header="Ações"
          headerStyle={{ minWidth: "180px" }}
          frozen
          alignFrozen="right"
          body={buttonsTemplate}
        />
      ) : null}
    </DataTable>
  );
}

export default Datatable;
