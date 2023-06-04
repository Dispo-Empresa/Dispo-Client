import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

function RegisterPanelMultiStep({ children }) {
  return (
    <MDBContainer fluid className="p-4">
      <div
        style={{
          float: "right",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          gap: "10px",
        }}
      ></div>
      <MDBRow className="g-5">
        <>{children}</>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterPanelMultiStep;
