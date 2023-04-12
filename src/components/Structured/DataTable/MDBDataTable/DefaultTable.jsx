import Detail from "./Detail"

import { useState } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import { DefaultModal } from "../../../Structured/Modal/ModalDialog"
import { TypeOptions } from "../../Modal/ModalTypes"
import { SearchButton, EditButton } from "../../../Basic/Button/IconButtons/DatatableButtons"

import "./styles.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

export function DefaultTable(props) {

  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  function rowActionClick(row){

    function onSearchView() {
      setItemId(row.id);
      setItemName(row.name ?? undefined);
      setShowModal(true);
      setModalType(TypeOptions.ViewModal);
    };

    function onEditView() {
      setItemId(row.id);
      setItemName(row.name ?? undefined);
      setShowModal(true);
      setModalType(TypeOptions.EditModal);
    };

    return{
      ...row,
      actions: (
        <div className="actionButtons">
          <SearchButton onClick={onSearchView} />
          <EditButton onClick={onEditView} />
        </div>
      )
    };
  };

  const datatable = 
  {
    columns: props.columns,
    rows: props.data && props.data.map((row) => rowActionClick(row))
  };

  return (
    <div className="datatable-container">
      <DefaultModal 
        title={itemName}
        open={showModal} 
        onClose={() => setShowModal(false)}
      >
        <Detail modalType={modalType} rowId={itemId} />
      </DefaultModal>
      <MDBDataTableV5
        striped
        hover
        scrollY
        scrollX
        maxHeight='60vh'
        entriesOptions={props.rowsPerPageOptions}
        entries={props.rowsPerPage}
        data={datatable}
        searchTop
        searchBottom={false}
      />
  </div>
  );
}