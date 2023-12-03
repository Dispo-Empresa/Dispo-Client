import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";

function NumberField(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <InputNumber
        disabled={props.disabled}
        inputClassName={classNames({ "p-invalid": props.error })}
        className="form-control"
        value={props.value}
        onValueChange={props.onChange}
        style={{
          width: props.width ?? "100px",
        }}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { NumberField };
