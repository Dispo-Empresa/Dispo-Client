import { Dropdown } from "primereact/dropdown";

import Required from "./indicators/Required";
import Tip from "./indicators/Tip";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "./styles.css";

function SelectWithFilter(props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ fontWeight: "bold" }}>{props.label}</label>
        <div style={{ marginLeft: "10px", marginTop: "-10px" }}>
          {props.required && <Required />}
          {props.message && <Tip message={props.message} />}
        </div>
      </div>
      <Dropdown
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        placeholder={"Selecione uma opção" ?? props.placeholder}
        filter
        showClear={!props.required}
        className="small-dropdown"
        style={{
          width: "300px",
          height: "35px",
          fontSize: "13px",
          lineHeight: "5px",
          borderColor: props.error && "red",
        }}
      />
      {props.error && (
        <span style={{ color: "red", fontSize: "14px" }}>{props.error}</span>
      )}
    </div>
  );
}

export { SelectWithFilter };
