import { useState, useEffect, useLayoutEffect, useRef } from "react";
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
import { get, post } from "services/httpMethods";

import convert from "components/structured/datatable/filterMatchModeConverter";

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
  const [dataByFilter, setDataByFilter] = useState(null);
  const [filters, setFilters] = useState({});
  const [recordCount, setRecordCount] = useState(0);
  const filterMatchModes = [
    { label: "Contém", value: FilterMatchMode.CONTAINS },
    { label: "Começa com", value: FilterMatchMode.STARTS_WITH },
  ];

  const { data: getCount } = useFetch(
    `https://localhost:7153/api/v1/datatable/get-count?entity=${entity}`
  );

  //const [recordsTeste, setRecordsTeste] = useState(null);

  const {
    data: datatableData,
    loading: loadingData,
    refetch,
  } = useFetch(urlDataDatatable);

  const initFilters = () => {
    const initialFilters = {};
    columns.forEach((column) => {
      initialFilters[column.field] = {
        operator: FilterOperator.AND,
        constraints: [
          {
            value: null,
            matchMode:
              column.filterMatchModes !== null &&
              column.filterMatchModes !== undefined
                ? column.filterMatchModes[0].value
                : FilterMatchMode.CONTAINS,
          },
        ],
      };
    });
    setFilters(initialFilters);
    setGlobalFilterValue("");
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      initFilters();
      firstUpdate.current = false;
      return;
    }

    var requestData = {
      entity: entity,
      properties: columnFilter,
      paginationConfig: {
        pageNumber: 1,
        pageSize: rows,
      },
    };

    async function fetchData() {
      if (columnFilter.length < 1) return;

      var response = await post(
        "https://localhost:7153/api/v1/datatable/get-by-filter",
        requestData
      );

      if (response === null || response === undefined) return;

      setDataByFilter(response.data.records);
      setRecordCount(response.data.recordCount);
    }
    fetchData();
  }, [columnFilter, entity, rows]);

  const buildFilter = (fieldName, fieldValue, filterMatchMode) => {
    var filterPropertiesModel = {
      name: fieldName,
      value: fieldValue,
      searchType: convert(filterMatchMode),
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
        {<RefreshButton onClick={onRefresh} />}
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

  // OK // Já estamos mandando o filterMatchMode para a api, porem ela ainda não esta filtrando corretamente - Só esta filtrando quando colocamos o nome exatamente igual
  // OK // Filtrar pelos outros tipos de filtros (valor, enum etc) - Se mandamos algo diferente de string para a api da erro, por enquanto ela aceita apenas string
  // OK // Adicionar filterMatchModes diferentes para filtros personalizados (ex: campo de valor vai ter greater than e less than) - feito passar o filterMatchModes como parametro nas colunas (da pra padronizar se passarmos o tipo do campo (currency, enum, string), o default (caso nao passar parametro) ficou como é hoje)
  // OK // TESTAR OS TIPOS DE FILTRO PARA VER SE ESTA MANDANDO O VALOR DAS STRINGS, ENUNS E VALORES
  // NAO OK // Analisar como vamos formatar os dados ao obte-los
  // NAO OK // FILTRO POR DATETIME
  // NAO OK // BOTÃO REFRESH DEVE LIMPAR OS FILTROS E FAZER UM REFRESH NA DATATABLE COMO ACONTECIA ANTES

  const onPageChange = async (event) => {
    var existsFilter = columnFilter.length > 0;

    setFirst(event.first);
    setRows(event.rows);

    if (existsFilter) {
      var requestData = {
        entity: entity,
        properties: columnFilter,
        paginationConfig: {
          pageNumber: event.page + 1,
          pageSize: event.rows,
        },
      };

      var response = await post(
        "https://localhost:7153/api/v1/datatable/get-by-filter",
        requestData
      );

      if (response === null || response === undefined) return;

      setDataByFilter(response.data.records);
      setRecordCount(response.data.recordCount);
    } else {
      setUrlDataDatatable(
        `https://localhost:7153/api/v1/datatable/get-all?Entity=${entity}&PageNumber=${
          event.page + 1
        }&PageSize=${event.rows}`
      );
    }
  };

  const onSearchApply = async (event, isKeyPressed = false) => {
    if (event.key !== "Enter" && isKeyPressed) return;

    buildFilter(columns[0].field, globalFilterValue, filterMatchModes[0].value);
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

  const onRefresh = async () => {
    initFilters();
    setDataByFilter(null);
    setRecordCount(getCount && getCount.data);
    setColumnFilter([]);
    refetch();
  };

  const onFilterMatchModeChanged = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.field]: {
        operator: FilterOperator.AND,
        constraints: [
          {
            ...prevFilters[e.field],
            matchMode: e.matchMode ?? filterMatchModes[0].value,
          },
        ],
      },
    }));
  };

  const onApplyColumnFilter = async (event, col) => {
    var filterInputedValue = event.constraints.constraints[0].value;

    if (col.enum) {
      filterInputedValue = col.enum.find((x) => x.value === filterInputedValue);
    }

    buildFilter(
      event.field,
      filterInputedValue,
      event.constraints.constraints[0].matchMode
    );
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
        value={dataByFilter ?? (datatableData && datatableData.data)}
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
              filterElement={col.filterElement}
              filter
              filterMatchModeOptions={col.filterMatchModes ?? filterMatchModes}
              showFilterOperator={false}
              showAddButton={false}
              filterClear={clearFilterButtonTemplate}
              filterApply={applyFilterButtonTemplate}
              onFilterApplyClick={(event) => onApplyColumnFilter(event, col)}
              showFilterMatchModes={!col.hideFilterMatchModes ?? true}
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
          totalRecords={recordCount ? recordCount : getCount && getCount.data}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Datatable;
