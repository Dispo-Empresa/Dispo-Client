function TextArea(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        {props.label}
      </label>
      <textarea
        name={props.name}
        rows={props.rows ?? 4}
        cols={props.cols ?? 50}
        disabled={props.disabled ?? false}
        className="form-control"
        style={{ width: "500px" }}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default TextArea;
