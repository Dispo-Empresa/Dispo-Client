import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";

import Tip from "components/ui/inputs/indicators/tip/TipIcon";
import Required from "components/ui/inputs/indicators/required/RequiredIcon";

import "components/ui/inputs/styles.css";

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
      <InputNumber
        id={props.id}
        disabled={props.disabled}
        value={props.value}
        onValueChange={props.onChange}
        mode="currency"
        currency="BRL"
        locale="pt-BR"
        inputClassName={classNames({ "p-invalid": props.error })}
        style={{
          borderColor: props.error && "red",
          width: "200px",
        }}
      />
      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { CurrencyField };
