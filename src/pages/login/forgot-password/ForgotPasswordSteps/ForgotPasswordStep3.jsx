import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider } from 'primereact/divider';

import { PasswordField } from '../../../../components/ui/inputs/passwordfield/PasswordField';
import { StepLayout } from '../../../../components/structured/stepper/Stepper';
import Button from "../../../../components/ui/buttons/classic/Button";

import "./style.css";

function ForgotPasswordStep3(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 300 segundos = 5 minutos
  const [value, setValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  let navigate = useNavigate();
  
  const [suggestionsCompleted, setSuggestionsCompleted] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    minLength: false
  });


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Atualizar o estado das sugestões conforme necessário
    setSuggestionsCompleted({
      ...suggestionsCompleted,
      lowercase: /[a-z]/.test(e.target.value),
      uppercase: /[A-Z]/.test(e.target.value),
      numeric: /\d/.test(e.target.value),
      minLength: e.target.value.length >= 8
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // apagar

  const validatePassword = (input, confirmPassword) => {
    if (!input) {
      return 'Campo obrigatório';
    } else if (!/^\S*$/.test(input)) {
      return 'A senha não pode conter espaços em branco';
    } else if (!/(?=.*[a-z])/.test(input)) {
      return 'Pelo menos uma letra minúscula é necessária';
    } else if (!/(?=.*[A-Z])/.test(input)) {
      return 'Pelo menos uma letra maiúscula é necessária';
    } else if (!/(?=.*\d)/.test(input)) {
      return 'Pelo menos um número é necessário';
    } else if (input.length < 8) {
      return 'Mínimo de 8 caracteres é necessário';
    }else if (password != confirmPassword)
      return 'As senha precisam ser iguais'
    return '';
  };

  const onConfirmar = () => {
    const passwordError = validatePassword(password, confirmPassword);
    setPasswordError(passwordError);

    if (!passwordError && password === confirmPassword) {
      navigate("/login/signin");
    } else {
      // Adicione lógica para lidar com senhas não coincidentes
    }
  };


  return (
    <StepLayout {...props} hideButtonsBack>
      <div className="container-step3">
        <div className="step3-inputs">
          <PasswordField
            type={showPassword ? 'text' : 'text'}
            toggleMask
            placeholder='Nova Senha'
            style={{
              marginTop: "-20px"
            }}
            onChange={(e) => {
              handlePasswordChange(e);
              setValue(e.target.value);
            }}
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <PasswordField
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmar Senha"
            toggleMask
            style={{
              marginTop: "10px"
            }}
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p className="info-text">
            <u>Todas as informações sigilosas são submetidas a criptografia e são tão bem protegidas que nem a equipe da Dispo possui acesso a elas.</u>
          </p>
          <div className="confirm-button">
            <Button
              title="Confirmar"
              width="300px"
              height="45px"
              onClick={onConfirmar}
              disabled={!Object.values(suggestionsCompleted).every((completed) => completed)}
            />
          </div>
        </div>
      </div>
    </StepLayout>
  );
}

export default ForgotPasswordStep3;
