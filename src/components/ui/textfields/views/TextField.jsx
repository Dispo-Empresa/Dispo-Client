function TextFieldDisabled(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        {props.label}
      </label>
      <br />
      <input
        type="text"
        className="form-control"
        style={{ width: "300px" }}
        disabled
        value={props.value}
      />
    </div>
  );
}

export default TextFieldDisabled;
