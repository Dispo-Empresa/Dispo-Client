import { InputMask } from "primereact/inputmask";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";

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
        mask="+55 (99) 9 9999-9999"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { PhoneField };
