import { createContext, useState } from 'react';
import useAlertScheme from '../../../hooks/alert/useAlertScheme';

const AbstractFormContext = createContext();

const AbstractFormContextProvider = ({ children }) => {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const [isNewRegister, setIsRegister] = useState(true);

  return (
    <AbstractFormContext.Provider value={{ showAlert, openAlert, loading, setLoading, isNewRegister, setIsRegister }}>
      {children}
    </AbstractFormContext.Provider>
  );
};

export { AbstractFormContext, AbstractFormContextProvider };
