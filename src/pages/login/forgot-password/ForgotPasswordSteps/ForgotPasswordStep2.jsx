import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { StepLayout } from "components/structured/stepper/Stepper";

import "./style.css";

function ForgotPasswordStep2(props) {
  const codeExpirationTime = 180; // 180 sec > 3 min
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [timeRemaining, setTimeRemaining] = useState(codeExpirationTime);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value.slice(0, 1);

    if (inputValue && !isNaN(parseInt(inputValue, 10))) {
      const newCodes = [...codes];
      newCodes[index] = inputValue;
      setCodes(newCodes);

      if (index < codes.length - 1) {
        inputRefs[index + 1].focus();
      }

      if (newCodes.every((code) => code !== "")) {
        ////
        // VALIDAR SE CÓDIGO ESTA CORRETO
        ////
        props.nextStep();
      }
    }
  };

  const handleResendCode = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setTimeRemaining(codeExpirationTime);
    }
  };

  useEffect(() => {
    inputRefs[0].focus();

    const timer = setInterval(() => {
      if (props.timerInicialStarted) {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsResendDisabled(false);
            return 0;
          }
        });
      } else {
        return 0;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [props.timerInicialStarted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <StepLayout {...props} hideButtonsBack>
      <div className="container-step2">
        <h1 className="step2-title">
          Código de recuperação enviado para o seu e-mail.
        </h1>
        <div className="code-input-container">
          {codes.map((code, index) => (
            <TextField
              className="code-input"
              key={index}
              variant="outlined"
              value={code}
              onChange={(e) => handleInputChange(e, index)}
              inputProps={{ style: { textAlign: "center" } }}
              inputRef={(ref) => (inputRefs[index] = ref)}
            />
          ))}
        </div>
        <p
          className="resend-code"
          onClick={handleResendCode}
          style={{ visibility: isResendDisabled ? "hidden" : "visible" }}
        >
          <u>Reenviar código de recuperação</u>
        </p>
        <h1
          className="expiry-message"
          style={{ visibility: isResendDisabled ? "visible" : "hidden" }}
        >
          Código expira em {formatTime(timeRemaining)}
        </h1>
      </div>
    </StepLayout>
  );
}

export default ForgotPasswordStep2;
