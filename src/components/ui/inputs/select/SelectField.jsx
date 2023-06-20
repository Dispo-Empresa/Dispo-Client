import { Dropdown } from "primereact/dropdown";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import "./styles.css";
import "../styles.css";

function SelectWithFilter(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.message && <TipIcon message={props.message} />}
        </div>
      </div>
      <Dropdown
        showFilterClear
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder ?? "Selecione uma opção"}
        filter
        showClear={!props.required}
        className={props.error ? "p-invalid select" : "small-dropdown select"}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { SelectWithFilter };
