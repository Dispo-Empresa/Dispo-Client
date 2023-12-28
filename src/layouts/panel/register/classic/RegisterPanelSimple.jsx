import { MDBRow } from "mdb-react-ui-kit";

import "./styles.css";

function RegisterPanelSimple({ onSubmit, title, children }) {
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
