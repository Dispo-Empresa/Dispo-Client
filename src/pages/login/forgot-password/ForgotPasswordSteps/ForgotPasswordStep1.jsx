import { useState } from "react";

import { TextField } from "components/ui/inputs/textfield/TextField";
import { StepLayout } from "components/structured/stepper/Stepper";

function ForgotPasswordStep1(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (input) => {
    if (!input) {
      return "Campo obrigatório";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
      return "Email inválido";
    }
    return "";
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    // Validar o e-mail
    const error = validateEmail(email);
    setEmailError(error);

    if (!error) {
      // Se não houver erro, avance para o próximo passo
      props.timerInicialized(true);
      props.nextStep();
    }
  };

  return (
    <StepLayout {...props} onNextStep={handleEmailBlur}>
      <div className="container-email">
        <h1 style={{ fontSize: "1em" }}>
          Redefina sua senha em apenas 3 etapas!
        </h1>
        <TextField
          type="email"
          placeholder="E-mail"
          className="form-control classic"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
        />
      </div>
    </StepLayout>
  );
}

export default ForgotPasswordStep1;
