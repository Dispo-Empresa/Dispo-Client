import ReactTable from "react-table-6";  

import "react-table-6/react-table.css"
import "./styles.css"

export function DefaultTable(props) {

  return (
    <div>
      {props.headerTable}
      <ReactTable
        className="react-table-style"
        data={props.data}
        //PaginationComponent={Pagination}
        columns={props.columns}
        rowsText={props.title}
        r
      />
    </div>
  );
}