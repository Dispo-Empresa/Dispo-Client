function TextFieldDisabled(props) {

    return (
      <div>
        <label>{props.label}</label>
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