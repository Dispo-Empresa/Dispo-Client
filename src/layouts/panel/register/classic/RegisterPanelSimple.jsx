import { useEffect } from "react";
import { MDBRow } from "mdb-react-ui-kit";

import useAlert from "../../../../hooks/alert/useAlert";
import AlertMessagePanel from "../../../../components/structured/alert/panel/AlertPanel";

import "./styles.css";

function RegisterPanelSimple({
  onSave,
  onSubmit,
  title,
  alertPanel,
  loading,
  children,
  buttons,
  hideSaveButton,
}) {
  return (
    <div style={{ width: "100%", marginBottom: "5%" }}>
      <form onSubmit={onSubmit}>
        <label className="title">{title}</label>
        <MDBRow className="g-5">{children}</MDBRow>
      </form>
    </div>
  );
}

export default RegisterPanelSimple;
