export function MDBTextField(props) {

  return (
    <>
      <label>{props.label}</label>
        <input
          type={props.type ?? "text"}
          className="form-control"
          style={{ width: "300px" }}
          value={props.value}
          disabled={props.disabled}
          onChange={props.onChange}
      />
    </>
  );
}

export function MDBTextFieldView(props) {

  return (
    <>
      <label>{props.label}</label>
        <input
          type="text"
          className="form-control"
          style={{ width: "300px" }}
          disabled
          value={props.value}
      />
    </>
  );
}

export function MDBTextArea(props) {

  return (
    <>
      <label>{props.label}</label>
        <textarea
          rows={props.rows ?? 4}
          cols={props.cols ??50}
          disabled={props.disabled ?? false}
          className="form-control"
          style={{ width: "300px" }}
          value={props.value}
          onChange={props.onChange}
      />
    </>
  );
}

export function MDBSelectTextField(props) {

  return (
    <>
      <label>Inventory</label>
      <select 
        className="form-control" 
        style={{ width: "300px" }}
        value={props.value}
        onChange={props.onChange}
        >
        {
          props.options.map(option => { return <option value={option.value}>{option.label}</option> })
        }
      </select>
    </>
  );
}