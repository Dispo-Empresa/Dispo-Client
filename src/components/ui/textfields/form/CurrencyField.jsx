import CurrencyInput from "react-currency-input-field";

import Required from "./indicators/Required";
import Tip from "./indicators/Tip";

function CurrencyField(props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ fontWeight: 600 }}>{props.label}</label>
        <div style={{ marginLeft: "10px", marginTop: "-10px" }}>
          {props.required && <Required />}
          {props.message && <Tip message={props.message} />}
        </div>
      </div>
      <CurrencyInput
        className="form-control"
        name={props.name}
        decimalsLimit={2}
        fixedDecimalLength={true}
        onValueChange={props.onChange}
        value={props.value}
        prefix="R$ "
        style={{
          width: "200px",
          borderColor: props.error && "red",
          fontSize: "15px",
          borderRadius: "5px",
        }}
      />
      {props.error && (
        <span style={{ color: "red", fontSize: "14px" }}>{props.error}</span>
      )}
    </div>
  );
}

export default CurrencyField;
