import Required from "./indicators/Required";
import Tip from "./indicators/Tip";

function TextArea(props) {
  return (
    <div>
      <label style={{ marginBottom: "1%", fontWeight: "bold" }}>
        {props.label}
      </label>
      {props.required && <Required />}
      {props.message && <Tip message={props.message} />}
      <br />
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
