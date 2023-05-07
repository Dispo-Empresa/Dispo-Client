import { Dropdown } from "primereact/dropdown";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import "./styles.css";

function SelectField(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        Inventory
      </label>
      <br />
      <select
        className="form-control"
        style={{ width: "300px" }}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}

function SelectWithFilter(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        {props.label}
      </label>
      <br />
      <Dropdown
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder}
        filter
        className="small-dropdown"
        style={{
          width: "300px",
          height: "35px",
          fontSize: "13px",
          lineHeight: "5px",
        }}
      />
    </div>
  );
}

export { SelectField, SelectWithFilter };
