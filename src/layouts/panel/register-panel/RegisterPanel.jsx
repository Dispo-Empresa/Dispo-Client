import { useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import useAlert from "../../../hooks/useAlert";
import AlertMessagePanel from "../../../components/structured/alert/panel/AlertPanel";

function RegisterPanel({ title, alert, children }) {
  const [alertType, alertTitle, alertMessage, openAlert, closeAlert] =
    useAlert();

  useEffect(() => {
    if (alert) {
      openAlert(alert.type, alert.title, alert.message);
    } else {
      closeAlert();
    }
  }, [alertType, alertTitle, alertMessage, openAlert, closeAlert, alert]);

  return (
    <div>
      <MDBContainer fluid className="p-4">
        <div style={{ marginBottom: "2%" }}>
          {alertType && alertTitle && (
            <AlertMessagePanel
              type={alertType}
              title={alertTitle}
              message={alertMessage}
              onClose={alert && alert.onClose}
            />
          )}
        </div>
        <label
          style={{
            fontFamily: "sans-serif",
            fontSize: "20px",
            color: "#0c9abe",
            fontWeight: "bold",
          }}
        >
          {title}
        </label>
        {title && <hr style={{ marginBottom: "50px", marginTop: "5px" }} />}
        <MDBRow className="g-5">
          <>{children}</>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default RegisterPanel;
