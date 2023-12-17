import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/ui/buttons/classic/Button";
import { PasswordField } from "components/ui/inputs/password/PasswordField";
import { StepLayout } from "components/structured/stepper/Stepper";

import "./style.css";

function ForgotPasswordStep3(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [suggestionsCompleted, setSuggestionsCompleted] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    minLength: false,
  });
  let navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSuggestionsCompleted({
      ...suggestionsCompleted,
      lowercase: /[a-z]/.test(e.target.value),
      uppercase: /[A-Z]/.test(e.target.value),
      numeric: /\d/.test(e.target.value),
      minLength: e.target.value.length >= 8,
    });

    if (confirmPassword !== e.target.value) {
      setPasswordError("As senhas não conferem");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError("As senhas não conferem");
    } else {
      setPasswordError(null);
    }
  };

  const validatePassword = (value) => {
    debugger;
    if (!value) {
      return "Campo obrigatório";
    } else if (!/^\S*$/.test(value)) {
      return "A senha não pode conter espaços em branco";
    } else if (!/(?=.*[a-z])/.test(value)) {
      return "Pelo menos uma letra minúscula é necessária";
    } else if (!/(?=.*[A-Z])/.test(value)) {
      return "Pelo menos uma letra maiúscula é necessária";
    } else if (!/(?=.*\d)/.test(value)) {
      return "Pelo menos um número é necessário";
    } else if (value.length < 8) {
      return "Mínimo de 8 caracteres é necessário";
    }
    return "";
  };

  const onConfirmar = () => {
    var errors = validatePassword(password);
    setPasswordError(errors);

    if (!errors) {
      navigate("/login/signin");
    }
  };

  return (
    <StepLayout {...props} hideButtonsBack>
      <div className="container-step3">
        <PasswordField
          toggleMask
          placeholder="Nova Senha"
          onChange={(e) => {
            handlePasswordChange(e);
          }}
          value={password}
          onChangeConfirm={(e) => handleConfirmPasswordChange(e)}
          valueConfirm={confirmPassword}
          error={passwordError}
          sugestion={suggestionsCompleted}
        />
        <p className="info-text">
          <u>
            Todas as informações sigilosas são submetidas a criptografia e são
            tão bem protegidas que nem a equipe da Dispo possui acesso a elas.
          </u>
        </p>
        <div className="confirm-button">
          <Button
            title="Confirmar"
            width="300px"
            height="45px"
            onClick={onConfirmar}
          />
        </div>
      </div>
    </StepLayout>
  );
}

export default ForgotPasswordStep3;
