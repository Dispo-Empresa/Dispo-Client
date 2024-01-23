import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

import TipIcon from "components/ui/inputs/indicators/tip/TipIcon";
import RequiredIcon from "components/ui/inputs/indicators/required/RequiredIcon";

import "components/ui/inputs/styles.css";

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
        value={props.value}
        onValueChange={props.onChange}
        size={10}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { NumberField };
