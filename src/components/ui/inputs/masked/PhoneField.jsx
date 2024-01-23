import { InputMask } from "primereact/inputmask";

import TipIcon from "components/ui/inputs/indicators/tip/TipIcon";
import RequiredIcon from "components/ui/inputs/indicators/required/RequiredIcon";

import "components/ui/inputs/styles.css";

function PhoneField(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <InputMask
        type="phone"
        mask="(99) 9 9999-9999"
        className="form-control"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        style={{
          width: "200px",
        }}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { PhoneField };
