import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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

  return (
    <div>
      <ConfirmDialog />
      <DataTable
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
        showGridlines
        scrollable
        value={fromApi ? data && data.data : data}
        selection={selectedItens}
        onSelectionChange={(e) => onSelectItens(e)}
        paginator
        rows={rowsPerPage != null ? rowsPerPage[0] : 5}
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
              key={col.field}
              field={col.field}
              header={col.header}
              body={col.body}
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
