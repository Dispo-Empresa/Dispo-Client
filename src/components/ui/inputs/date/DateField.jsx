import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";

function Datefield(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <Calendar
        showIcon={!props.hideIcon}
        timeOnly={props.timeOnly}
        name={props.name} // Usar apenas no MultiStep
        dateFormat="dd/mm/yy"
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        inputClassName={classNames({ "p-invalid": props.error })}
        style={{
          borderColor: props.error && "red",
          width: props.width ?? "200px",
        }}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { Datefield };
