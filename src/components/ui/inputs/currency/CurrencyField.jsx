import CurrencyInput from "react-currency-input-field";

import Tip from "../indicators/tip/TipIcon";
import Required from "../indicators/required/RequiredIcon";

import "../styles.css";

function CurrencyField(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <Required />}
          {props.message && <Tip message={props.message} />}
        </div>
      </div>
      <CurrencyInput
        className="form-control"
        decimalsLimit={2}
        fixedDecimalLength={true}
        onValueChange={props.onChange}
        value={props.value}
        prefix="R$ "
        style={{
          borderColor: props.error && "#FF0000",
          width: "200px",
        }}
      />
      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { CurrencyField };
