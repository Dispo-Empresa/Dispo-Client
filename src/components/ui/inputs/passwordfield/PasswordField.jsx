import React, { useState} from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider } from 'primereact/divider';

import TipIcon from '../indicators/tip/TipIcon';
import { Password } from 'primereact/password';
import RequiredIcon from '../indicators/required/RequiredIcon';

import '../styles.css';

function PasswordField(props) {

    const [password, setPassword] = useState('');

    const [suggestionsCompleted, setSuggestionsCompleted] = useState({
        lowercase: false,
        uppercase: false,
        numeric: false,
        minLength: false
      });

    const header = <div className="font-bold mb-3">Escolha uma senha</div>;
    const footer = (
      <>
        <Divider />
        <p className="mt-2">Sugestões</p>
        <ul className="pl-2 ml-2 mt-0 line-height-3">
          <li style={{ textDecoration: suggestionsCompleted.lowercase ? 'line-through' : 'none' }}>Pelo menos uma letra minúscula</li>
          <li style={{ textDecoration: suggestionsCompleted.uppercase ? 'line-through' : 'none' }}>Pelo menos uma letra maiúscula</li>
          <li style={{ textDecoration: suggestionsCompleted.numeric ? 'line-through' : 'none' }}>Pelo menos um número</li>
          <li style={{ textDecoration: suggestionsCompleted.minLength ? 'line-through' : 'none' }}>Mínimo de 8 caracteres</li>
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
        onChange={props.onChange}
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
