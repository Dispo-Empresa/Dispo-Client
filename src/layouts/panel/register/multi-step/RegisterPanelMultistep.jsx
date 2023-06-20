import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import "./styles.css";

function RegisterPanelMultiStep({ children }) {
  return (
    <MDBContainer fluid className="p-4">
      <div className="step-content"></div>
      <MDBRow className="g-5">
        <>{children}</>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterPanelMultiStep;
