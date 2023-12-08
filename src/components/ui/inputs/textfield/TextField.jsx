import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";

function TextField(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <input
        id={props.id}
        name={props.name} // Usar apenas no MultiStep
        type={props.type ?? "text"}
        className="form-control"
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        onKeyDown={props.onKeyPress}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        style={{
          borderColor: props.error && "red",
          width: props.width ?? "300px",
        }}
      />
      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { TextField };
