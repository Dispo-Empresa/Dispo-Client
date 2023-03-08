
import { useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import "./style.css";

export function AlertMessagePanel(props) {
  
  const [showAlert, setShowAlert] = useState(true);

  return (
    showAlert &&
    <Alert severity={props.type} className="messagePanel" onClose={() => setShowAlert(false)}>
      <AlertTitle>{props.type == "warning" ? "Aviso" : props.type == "info" ? "Aviso" : props.type == "success" ? "Sucesso" : props.type == "error" ? "Erro" : "????"}</AlertTitle>
      {props.description}
    </Alert>
  );
}