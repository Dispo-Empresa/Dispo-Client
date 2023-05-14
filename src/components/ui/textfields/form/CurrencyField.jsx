import CurrencyInput from "react-currency-input-field";

function CurrencyField(props) {
  return (
    <div>
      <label style={{ marginBottom: "2%", fontWeight: "bold" }}>
        {props.label}
      </label>
      <CurrencyInput
        className="form-control"
        name={props.name}
        decimalsLimit={2}
        onValueChange={props.onChange}
        value={props.value}
        prefix="R$ "
        style={{
          width: "200px",
          borderColor: props.error && "red",
          fontSize: "15px",
          borderRadius: "5px",
        }}
        disabled={props.disabled}
      />
    </div>
  );
}

export default CurrencyField;
