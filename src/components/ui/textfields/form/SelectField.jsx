function SelectField(props) {
    return (
      <div>
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
      </div>
    );
}

export default SelectField;