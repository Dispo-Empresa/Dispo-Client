import Tip from "./indicators/Tip";
import Required from "./indicators/Required";

import "./styles.css";

function TextField(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        {props.label}
      </label>
      {props.required && <Required />}
      {props.message && <Tip message={props.message} />}
      <br />
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
        }}
      />
      {props.error && (
        <span style={{ color: "red", fontSize: "14px" }}>{props.error}</span>
      )}
    </div>
  );
}

export default TextField;
