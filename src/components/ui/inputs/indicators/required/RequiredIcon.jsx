import ErrorIcon from "@mui/icons-material/Error";

import "./styles.css";

function RequiredIcon() {
  return (
    <i title="Campo obrigatório" className="required">
      <ErrorIcon style={{ fontSize: "13px" }} />
    </i>
  );
}

export default RequiredIcon;
