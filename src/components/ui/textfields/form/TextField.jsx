import Tip from "./indicators/Tip";
import Required from "./indicators/Required";

import "./styles.css";

function TextField(props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
          {props.label}
        </label>
        <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
          {props.required && <Required />}
          {props.tipMessage && <Tip message={props.tipMessage} />}
        </div>
      </div>
      <input
        type={props.type ?? "text"}
        className="form-control classic"
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        onKeyDown={props.onKeyPress}
        placeholder={props.placeholder}
        style={{
          borderColor: props.error && "red",
          width: props.width ?? "300px",
        }}
      />
      {props.error && (
        <span style={{ color: "red", fontSize: "14px" }}>{props.error}</span>
      )}
    </div>
  );
}

export default TextField;
