import CurrencyTextField from "@unicef/material-ui-currency-textfield"

function CurrencyField(props) {
    return (
      <div>
        <label>{props.label}</label><br />
          <CurrencyTextField
            disabled={props.disabled ?? false}
            unselectable
            currencySymbol="R$"
            style={{ width: "300px" }}
            value={props.value}
            onChange={props.onChange}
        />
      </div>
    );
}

export default CurrencyField;