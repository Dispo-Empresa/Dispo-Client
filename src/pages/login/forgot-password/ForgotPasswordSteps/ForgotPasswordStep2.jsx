import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { StepLayout } from '../../../../components/structured/stepper/Stepper';
import "./style.css";

function ForgotPasswordStep2(props) {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [timeRemaining, setTimeRemaining] = useState(300); // 300 segundos = 5 minutos
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value.slice(0, 1);

    if (inputValue && !isNaN(parseInt(inputValue, 10))) {
      const newCodes = [...codes];
      newCodes[index] = inputValue;
      setCodes(newCodes);

      // Muda o foco para o próximo campo quando o comprimento atinge 1
      if (index < codes.length - 1) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const handleResendCode = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true);
      setTimeRemaining(10); // Reinicia o tempo de expiração
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {

      if(props.timerInicialStarted){
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsResendDisabled(false); // Reabilita o botão após 5 minutos
            return 0;
          }
        });
      }else{
        return 0
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [props.timerInicialStarted]);


  const EmailCodeChecker = () => {
    if (codes.every((code) => code !== '')) {
      props.nextStep();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Refs para os campos de texto
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  return (
    <StepLayout {...props} onNextStep={EmailCodeChecker}>
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
              inputProps={{ style: { textAlign: 'center' } }}
              onBlur={EmailCodeChecker}
              inputRef={(ref) => (inputRefs[index] = ref)}
            />
          ))}
        </div>
        <p
          className="resend-code"
          onClick={handleResendCode}
          style={{ visibility: isResendDisabled ? 'hidden' : 'visible' }}
        >
          <u>Reenviar código de recuperação</u>
        </p>
        <h1 className="expiry-message">
          Código expira em {formatTime(timeRemaining)}
        </h1>
      </div>
    </StepLayout>
  );
}

export default ForgotPasswordStep2;
