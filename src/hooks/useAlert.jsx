import { useState, useEffect } from 'react';

function useAlert(message, duration) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return visible;
}

export default useAlert;

// COMO USAR

//import React, { useState } from 'react';
//import useAlert from './hooks/useAlert';
//
//function App() {
//  const [message, setMessage] = useState(null);
//
//  const showMessage = () => {
//    setMessage('Olá! Esta é uma mensagem de alerta.');
//  };
//
//  const visible = useAlert(message);
//
//  return (
//    <div>
//      <button onClick={showMessage}>Mostrar mensagem de alerta</button>
//      {visible && <div>{message}</div>}
//    </div>
//  );
//}
//
//export default App;