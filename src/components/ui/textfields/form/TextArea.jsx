function TextArea(props) {

    return (
      <div>
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
      </div>
    );
}

export default TextArea;