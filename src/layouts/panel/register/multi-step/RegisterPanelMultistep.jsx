import { useEffect } from "react";

import useAlert from "../../../../hooks/alert/useAlert";
import AlertMessagePanel from "../../../../components/structured/alert/panel/AlertPanel";

import "../classic/styles.css";

function RegisterPanelMultiStep({ children, title, buttons, alertPanel }) {
  const [alertType, alertTitle, alertMessage, openAlert, closeAlert] =
    useAlert();

  useEffect(() => {
    if (alertPanel) {
      openAlert(alertPanel.type, alertPanel.title, alertPanel.message);
    } else {
      closeAlert();
    }
  }, [alertType, alertTitle, alertMessage, openAlert, closeAlert, alertPanel]);

  return (
    <div style={{ width: "100%", marginBottom: "5%" }}>
      <div>
        {alertType && alertTitle && (
          <AlertMessagePanel
            type={alertType}
            title={alertTitle}
            message={alertMessage}
            onClose={alertPanel && alertPanel.onClose}
          />
        )}
      </div>
      <div className="buttons" style={{ marginBottom: "5px" }}>
        {buttons}
      </div>
      <hr style={{ marginBottom: "50px", width: "100%" }} />
      {children}
    </div>
  );
}

export default RegisterPanelMultiStep;
