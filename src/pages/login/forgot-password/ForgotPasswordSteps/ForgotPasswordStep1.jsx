import React, { useState } from 'react';
import { TextField } from '../../../../components/ui/inputs/textfield/TextField';
import { StepLayout } from '../../../../components/structured/stepper/Stepper';

function ForgotPasswordStep1(props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    // Verificar se o e-mail atende aos critérios desejados, por exemplo, não está vazio

    if(1 == 1){
      setEmailError("Email inválido, blabla");
    }

    if (email.trim() !== '') {
      props.timerInicialized(true);
      props.nextStep(); // Avançar para o próximo passo
    }
    // Adicione outras verificações conforme necessário
  };

  return (
    <StepLayout {...props} onNextStep={handleEmailBlur}>
      <div className="container-email">
      <h1 style={{ fontSize: '1em' }}>
        Redefina sua senha em apenas 3 etapas!
      </h1>
      <TextField
        type="email"
        placeholder='E-mail'
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
