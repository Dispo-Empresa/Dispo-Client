import Required from "./indicators/Required";
import Tip from "./indicators/Tip";

function TextArea(props) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ fontWeight: 600 }}>{props.label}</label>
        <div style={{ marginLeft: "10px", marginTop: "-10px" }}>
          {props.required && <Required />}
          {props.message && <Tip message={props.message} />}
        </div>
      </div>
      <textarea
        rows={props.rows ?? 4}
        cols={props.cols ?? 50}
        disabled={props.disabled ?? false}
        className="form-control"
        style={{
          width: "500px",
          borderColor: props.error && "red",
        }}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error && (
        <span style={{ color: "red", fontSize: "14px" }}>{props.error}</span>
      )}
    </div>
  );
}

export default TextArea;
