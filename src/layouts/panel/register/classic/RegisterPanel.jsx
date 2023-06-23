import { useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import useAlert from "../../../../hooks/alert/useAlert";
import AlertMessagePanel from "../../../../components/structured/alert/panel/AlertPanel";
import { SaveButton } from "../../../../components/ui/buttons/icons/IconButton";

import "./styles.css";

function RegisterPanel({
  title,
  alertPanel,
  children,
  onSave,
  buttons,
  hideSaveButton,
}) {
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
    <div>
      <MDBContainer fluid className="p-4">
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
        <label className="title">{title}</label>
        <div className="buttons">
          {buttons}
          {hideSaveButton ? "" : <SaveButton onClick={onSave} />}
        </div>
        <hr style={{ marginBottom: "50px", width: "100%" }} />
        <MDBRow className="g-5">
          <>{children}</>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default RegisterPanel;
