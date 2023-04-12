import { TextField } from "@mui/material";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export function DefaultTextField(props) {
  return (
    <TextField
      value={props.value}
      id="defaultTextField"
      variant={props.variant}
      label={props.label}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
      inputProps={props.inputProps}
      disabled={props.disabled}
      onKeyPress={props.onKeyPress}
      style={{
        width: props.width ?? 320,
        backgroundColor: "#fff",
      }}
    >
    </TextField>
  )
}

export function PasswordTextField(props) {
  return (
    <TextField
      value={props.value}
      id="passwordTextField"
      variant={props.variant}
      label={props.label}
      type={props.type}
      onChange={props.onChange}
      inputProps={props.inputProps}
      onKeyPress={props.onKeyPress}
      style={{
        width: props.width ?? 320,
        height: props.height ?? 50,
        backgroundColor: "white"
      }}
    >
    </TextField>
  )
}

export function SearchTextField(props) {
  return (
    <TextField
      value={props.value}
      id="searchTextField"
      variant="standard"
      placeholder="Search"
      type="text"
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      style={{
        backgroundColor: "white",
        height: props.height ?? 50,
        width: props.width ?? 800,
        marginTop: props.marginTop,
        marginLeft: props.marginLeft
      }}
    >
    </TextField>
  )
}

export function DefaultTextArea(props) {
  return (
    <TextField
      value={props.value}
      onChange={props.onChange}
      id="outlined-multiline-static"
      label={props.label}
      multiline
      rows={props.rows}
      variant="outlined"
      style={{
        width: props.width
      }}
    >
    </TextField>
  )
}

export function DefaultCurrencyTextField(props) {
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