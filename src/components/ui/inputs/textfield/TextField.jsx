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
          {props.tipMessage && <TipIcon message={props.tipMessage} />}
        </div>
      </div>
      <input
        type={props.type ?? "text"}
        className="form-control"
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        onKeyDown={props.onKeyPress}
        placeholder={props.placeholder}
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
