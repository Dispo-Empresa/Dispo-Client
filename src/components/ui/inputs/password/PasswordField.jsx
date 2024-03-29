import { Divider } from "primereact/divider";
import { Password } from "primereact/password";

import TipIcon from "components/ui/inputs/indicators/tip/TipIcon";
import RequiredIcon from "components/ui/inputs/indicators/required/RequiredIcon";

import "components/ui/inputs/styles.css";
import "./styles.css";

function PasswordField(props) {
  const header = <div className="font-bold mb-3">Escolha uma senha</div>;
  const footer = props.sugestion && (
    <>
      <Divider />
      <p className="mt-2">Sugestões</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li
          style={{
            textDecoration: props.sugestion.lowercase ? "line-through" : "none",
          }}
        >
          Pelo menos uma letra minúscula
        </li>
        <li
          style={{
            textDecoration: props.sugestion.uppercase ? "line-through" : "none",
          }}
        >
          Pelo menos uma letra maiúscula
        </li>
        <li
          style={{
            textDecoration: props.sugestion.numeric ? "line-through" : "none",
          }}
        >
          Pelo menos um número
        </li>
        <li
          style={{
            textDecoration: props.sugestion.minLength ? "line-through" : "none",
          }}
        >
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Password
          type={props.type}
          header={header}
          footer={footer}
          weakLabel="Fraca"
          mediumLabel="Media"
          strongLabel="Forte"
          promptLabel="Informe uma senha"
          feedback={props.sugestion}
          toggleMask={props.toggleMask}
          placeholder={props.placeholder}
          style={{
            marginBottom: props.allowConfirmPassword && "30px",
            ...props.style,
          }}
          onChange={props.onChange}
          value={props.value}
        />
        {props.allowConfirmPassword && (
          <Password
            feedback={false}
            placeholder="Confirme a senha"
            onChange={props.onChangeConfirm}
            value={props.valueConfirm}
          />
        )}
      </div>
      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { PasswordField };
