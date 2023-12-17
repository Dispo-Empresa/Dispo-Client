import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Divider } from "primereact/divider";

import TipIcon from "components/ui/inputs/indicators/tip/TipIcon";
import RequiredIcon from "components/ui/inputs/indicators/required/RequiredIcon";
import { Password } from "primereact/password";

import "components/ui/inputs/styles.css";

function PasswordField(props) {
  const [password, setPassword] = useState("");

  const [suggestionsCompleted, setSuggestionsCompleted] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    minLength: false,
  });

  const header = <div className="font-bold mb-3">Escolha uma senha</div>;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    // Atualizar o estado das sugestões conforme necessário
    setSuggestionsCompleted({
      lowercase: /[a-z]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      numeric: /\d/.test(newPassword),
      minLength: newPassword.length >= 8,
    });

    setPassword(newPassword);
  };

  const suggestionStyle = { textDecoration: "line-through" };

  const footer = (
    <>
      <Divider />
      <p className="mt-2">Sugestões</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li style={suggestionsCompleted.lowercase ? suggestionStyle : {}}>
          Pelo menos uma letra minúscula
        </li>
        <li style={suggestionsCompleted.uppercase ? suggestionStyle : {}}>
          Pelo menos uma letra maiúscula
        </li>
        <li style={suggestionsCompleted.numeric ? suggestionStyle : {}}>
          Pelo menos um número
        </li>
        <li style={suggestionsCompleted.minLength ? suggestionStyle : {}}>
          Mínimo de 8 caracteres
        </li>
      </ul>
    </>
  );

  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <Password
        type={props.type}
        header={header}
        footer={footer}
        weakLabel="Fraca"
        mediumLabel="Media"
        strongLabel="Forte"
        toggleMask={props.toggleMask}
        placeholder={props.placeholder}
        style={props.style}
        onChange={(e) => {
          handlePasswordChange(e);
          props.onChange && props.onChange(e); // Chamar onChange fornecido, se existir
        }}
        value={props.value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={props.onToggleVisibility}>
                {props.toggleMask ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { PasswordField };
