function TextField(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        {props.label}
      </label>
      <br />
      <input
        name={props.name}
        type={props.type ?? "text"}
        className="form-control"
        style={{
          width: "300px",
          borderColor: props.error && "red",
          fontSize: "15px",
          borderRadius: "5px",
          fontFamily: "Open Sans,sans-serif",
        }}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyPress}
      />
      {props.error && <span style={{ color: "red" }}>{props.error}</span>}
    </div>
  );
}

export default TextField;
