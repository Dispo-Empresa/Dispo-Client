import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
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
  SearchButton,
  ClearButton,
  ConfirmButton,
} from "components/ui/buttons/icons/IconButton";
import {
  RefreshButton,
  ExportButton,
} from "components/ui/buttons/icons/IconButton";
import { post } from "services/httpMethods";

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
  title,
  buttons,
  entity,
}) {
  let initialPageSize = 10;
  let urlDatatable = `https://localhost:7153/api/v1/datatable/get-all?Entity=${entity}&PageNumber=1&PageSize=${initialPageSize}`;
  const [urlDataDatatable, setUrlDataDatatable] = useState(urlDatatable);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(initialPageSize);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [columnFilter, setColumnFilter] = useState([]);
  const [filters, setFilters] = useState({});
  const filterMatchModes = [
    { label: "Contém", value: "contains" },
    { label: "Começa com", value: "startsWith" },
  ];

  const { data: getCount } = useFetch(
    "https://localhost:7153/api/v1/datatable/get-count"
  );

  const {
    data: datatableData,
    loading: loadingData,
    refetch,
  } = useFetch(urlDataDatatable);

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

  useEffect(() => {
    console.log(columnFilter);

    // CHAMADA DE API PARA O FILTRO
  }, [columnFilter]);

  const buildFilter = (fieldName, fieldValue) => {
    var filterPropertiesModel = {
      name: fieldName,
      type: "",
      value: fieldValue,
    };

    var paginationFilterModel = {
      entity: entity,
      pageNumber: 1,
      pageSize: rows,
    };

    var requestData = {
      propertes: filterPropertiesModel,
      paginationConfig: paginationFilterModel,
    };

    var fieldNameIndex = columnFilter.findIndex(
      (filter) => filter.name === fieldName
    );

    if (fieldNameIndex >= 0) {
      const updatedColumnFilter = [...columnFilter];
      updatedColumnFilter[fieldNameIndex] = filterPropertiesModel;
      setColumnFilter(updatedColumnFilter);
    } else {
      setColumnFilter([...columnFilter, filterPropertiesModel]);
    }

    //var response = await post(
    //  "https://localhost:7153/api/v1/datatable/get-by-filter",
    //  requestData
    //);
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

  const headerTemplate = () => {
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
          onKeyDown={(e) => onSearchApply(e, true)}
          onChange={onGlobalFilterChange}
        />
        {buttons}
        {<SearchButton onClick={onSearchApply} />}
        {<RefreshButton onClick={refetch} />}
        {<ExportButton onClick={onExportExcel} />}
      </div>
    );
  };

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

  const clearFilterButtonTemplate = (options) => {
    return <ClearButton onClick={options.filterClearCallback} />;
  };

  const applyFilterButtonTemplate = (options) => {
    return <ConfirmButton onClick={options.filterApplyCallback} />;
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
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

  const onSearchApply = async (event, isKeyPressed = false) => {
    if (event.key !== "Enter" && isKeyPressed) return;

    buildFilter(columns[0].field, globalFilterValue);
  };

  const onExportExcel = () => {
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

  const onApplyColumnFilter = (event) => {
    buildFilter(event.field, event.constraints.constraints[0].value);
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <label className="title">{title}</label>
      <ConfirmDialog />
      <DataTable
        scrollHeight="550px"
        rowsPerPageOptions={[10, 20, 30]}
        rows={rows}
        first={first}
        globalFilterFields={columns.map((col) => col.field)}
        filterDisplay="menu"
        header={headerTemplate}
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
              filter
              filterMatchModeOptions={filterMatchModes}
              showFilterOperator={false}
              showAddButton={false}
              filterClear={clearFilterButtonTemplate}
              filterApply={applyFilterButtonTemplate}
              onFilterApplyClick={onApplyColumnFilter}
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
