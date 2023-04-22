function MDBTextField(props) {

    return (
      <div>
        <label>{props.label}</label>
          <input
            type={props.type ?? "text"}
            className="form-control"
            style={{ width: "300px" }}
            value={props.value}
            disabled={props.disabled}
            onChange={props.onChange}
        />
      </div>
    );
}

export default TextField