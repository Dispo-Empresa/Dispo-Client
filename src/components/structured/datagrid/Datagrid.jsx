import { useState } from "react";
import { MDBDataTableV5 } from "mdbreact";

import { QueryDataButton, EditButton } from "../../ui/buttons/icons/IconButton";
import Detail from "./Detail";
import TypeOptions from "../../../data/constants/ModalTypes";
import ModalDialog from "../modal/ModalDialog";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.css";

function Datagrid(props) {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  function rowActionClick(row) {
    function onSearchView() {
      setItemId(row.id);
      setItemName(row.name ?? undefined);
      setShowModal(true);
      setModalType(TypeOptions.ViewModal);
    }

    function onEditView() {
      setItemId(row.id);
      setItemName(row.name ?? undefined);
      setShowModal(true);
      setModalType(TypeOptions.EditModal);
    }

    return {
      ...row,
      actions: (
        <div className="actionButtons">
          <QueryDataButton onClick={onSearchView} />
          <EditButton onClick={onEditView} />
        </div>
      ),
    };
  }

  const datatable = {
    columns: props.columns,
    rows: props.data && props.data.map((row) => rowActionClick(row)),
  };

  return (
    <div className="datatable-container">
      <ModalDialog
        title={itemName}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Detail modalType={modalType} rowId={itemId} />
      </ModalDialog>
      <MDBDataTableV5
        striped
        hover
        scrollY
        scrollX
        maxHeight="60vh"
        entriesOptions={props.rowsPerPageOptions}
        entries={props.rowsPerPage}
        data={datatable}
        searchTop
        searchBottom={false}
      />
    </div>
  );
}

export default Datagrid;
