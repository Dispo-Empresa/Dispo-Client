import HelpIcon from "@mui/icons-material/Help";

import "./styles.css";

function TipIcon(props) {
  return (
    <i title={props.message} className="tip">
      <HelpIcon style={{ fontSize: "13px" }} />
    </i>
  );
}

export default TipIcon;
