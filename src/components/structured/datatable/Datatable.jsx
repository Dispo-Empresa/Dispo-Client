import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import ButtonGroup from "components/ui/buttons/group/ButtonGroup";
import useFetch from "hooks/useFetchApi";
import {
  ConfirmDialog,
  confirmDialog,
} from "components/structured/dialog/ConfirmDialog";
import {
  QueryDataButton,
  DisableButton,
  EditButton,
  ConfirmButton,
  ClearButton,
} from "components/ui/buttons/icons/IconButton";
import {
  RefreshButton,
  ExportButton,
} from "components/ui/buttons/icons/IconButton";

function Datatable({
  rowClick,
  noDataMessage,
  showCheckbox,
  columns,
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
  entity,
}) {
  let initialPageSize = 10;
  let urlDatatable = `https://localhost:7153/api/v1/datatable/get-all?Entity=${entity}&PageNumber=1&PageSize=${initialPageSize}`;
  //let loadLazyTimeout = null;
  const [urlDataDatatable, setUrlDataDatatable] = useState(urlDatatable);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(initialPageSize);
  //const [virtualData, setVirtualData] = useState(Array.from({ length: initialPageSize }));
  //const [lazyLoading, setLazyLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const { data: getCount } = useFetch(
    "https://localhost:7153/api/v1/datatable/get-count"
  );

  const {
    data: datatableData,
    loading: loadingData,
    refetch,
  } = useFetch(urlDataDatatable);

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

  const dateTemplate = (rowData, column) => {
    const field = column.field;

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    var formattedDate = new Date(rowData[field]).toLocaleDateString(
      "pt-BR",
      options
    );

    return formattedDate;
  };

  //const loadingTemplate = (options) => {
  //  return (
  //    <div
  //      className="flex align-items-center"
  //      style={{ height: "17px", flexGrow: "1", overflow: "hidden" }}
  //    >
  //      <Skeleton
  //        width={
  //          options.cellEven
  //            ? options.field === "year"
  //              ? "30%"
  //              : "40%"
  //            : "60%"
  //        }
  //        height="1rem"
  //      />
  //    </div>
  //  );
  //};

  const onSelectItens = (e) => {
    onSelectItensCallback && onSelectItensCallback(e.value);
    setSelectedItens(e.value);
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);

    // FAZER O FILTRO PEGAR OS DADOS DO BACK END JUNTO COM OS PADROES DO ARTHUR
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);

    setUrlDataDatatable(
      `https://localhost:7153/api/v1/datatable/get-all?Entity=${entity}&PageNumber=${
        event.page + 1
      }&PageSize=${event.rows}`
    );
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        datatableData && datatableData.data
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, entity ?? "data");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
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
        {<RefreshButton onClick={refetch} />}
        {<ExportButton onClick={exportExcel} />}
      </div>
    );
  };

  const filterMatchModes = [
    { label: "Contém", value: "contains" },
    { label: "Começa com", value: "startsWith" },
  ];

  const [filters, setFilters] = useState({});

  useEffect(() => {
    const initialFilters = {};
    columns.forEach((column) => {
      initialFilters[column.field] = {
        operator: FilterOperator.AND,
        constraints: [
          {
            value: null,
            matchMode: FilterMatchMode.CONTAINS,
          },
        ],
      };
    });
    setFilters(initialFilters);
  }, [columns]);

  const onFilterMatchModeChanged = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.field]: {
        operator: FilterOperator.AND,
        constraints: [
          {
            ...prevFilters[e.field],
            matchMode: e.matchMode ?? FilterMatchMode.CONTAINS,
          },
        ],
      },
    }));
  };

  //const loadDataLazy = (event) => {
  //  !lazyLoading && setLazyLoading(true);
  //
  //  if (loadLazyTimeout) {
  //    clearTimeout(loadLazyTimeout);
  //  }
  //
  //  loadLazyTimeout = setTimeout(() => {
  //    let _virtualData = [...virtualData];
  //    let { first, last } = event;
  //
  //    const loadedData = datatableData && datatableData.data.slice(first, last);
  //
  //    if (Array.isArray(loadedData)) {
  //      Array.prototype.splice.apply(_virtualData, [
  //        ...[first, last - first],
  //        ...loadedData,
  //      ]);
  //
  //      setVirtualData(_virtualData);
  //    }
  //
  //    setLazyLoading(false);
  //  }, Math.random() * 500);
  //};

  const clearFilterButtonTemplate = (options) => {
    return <ClearButton onClick={options.filterClearCallback} />;
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <label className="title">{title}</label>
      <ConfirmDialog />
      <DataTable
        //scrollable
        scrollHeight="550px"
        //virtualScrollerOptions={{
        //  lazy: true,
        //  onLazyLoad: loadDataLazy,
        //  itemSize: 46,
        //  delay: loadLazyTimeout,
        //  showLoader: true,
        //  loading: lazyLoading,
        //  loadingTemplate,
        //}}
        rowsPerPageOptions={[10, 20, 30]}
        rows={rows}
        first={first}
        globalFilterFields={columns.map((col) => col.field)}
        filterDisplay="menu"
        header={renderHeader()}
        showGridlines
        //stripedRows
        filters={filters}
        onRowClick={onRowClick}
        size="small"
        //paginatorLeft={
        //  showCheckbox &&
        //  !singleSelect && (
        //    <label>
        //      <b>Selecionadas:</b>&nbsp;
        //      {selectedItens == null ? 0 : selectedItens.length}
        //    </label>
        //  )
        //}
        //selectionMode={!rowClick && showCheckbox ? "checkbox" : null}
        resizableColumns
        value={datatableData && datatableData.data}
        //selection={selectedItens}
        //onSelectionChange={(e) => onSelectItens(e)}
        loading={loadingData}
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
              //showFilterMenu={false}
              filter
              filterMatchModeOptions={filterMatchModes}
              showFilterOperator={false}
              showAddButton={false}
              showApplyButton={false}
              filterClear={clearFilterButtonTemplate}
              showFilterMatchModes={true}
              onFilterMatchModeChange={onFilterMatchModeChanged}
              filterPlaceholder={`Procurar por ${col.header}`}
              key={col.field}
              field={col.field}
              header={col.header}
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
            headerStyle={{
              fontWeight: "700",
              minWidth: "150px",
            }}
            frozen
            alignFrozen="right"
            body={buttonsTemplate}
          />
        ) : null}
      </DataTable>
      <div style={{ float: "right", marginTop: "15px" }}>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={getCount && getCount.data}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Datatable;
