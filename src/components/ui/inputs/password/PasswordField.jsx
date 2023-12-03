import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";

function PasswordField(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>

      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { PasswordField };
