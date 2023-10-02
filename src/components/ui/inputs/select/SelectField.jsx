import { Dropdown } from "primereact/dropdown";
import { MultiSelect as Multi } from "primereact/multiselect";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

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
        filter
        showFilterClear
        emptyMessage={props.emptyMessage ?? "Nenhum resultado encontrado"}
        emptyFilterMessage="Nenhum resultado encontrado"
        name={props.name}
        value={props.value}
        optionLabel={props.optionLabel}
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder ?? "Selecione uma opção"}
        showClear={!props.required}
        style={{
          borderColor: props.error && "red",
          width: props.width ?? "300px",
        }}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

function MultiSelect(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.message && <TipIcon message={props.message} />}
        </div>
      </div>
      <Multi
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        optionLabel={props.optionLabel}
        display="chip"
        filter
        placeholder={props.placeholder ?? "Selecione as opções"}
        maxSelectedLabels={3}
        style={{
          borderColor: props.error && "red",
          width: props.width ?? "500px",
        }}
      />
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { SelectWithFilter, MultiSelect };
