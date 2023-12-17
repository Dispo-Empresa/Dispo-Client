import useAlertScheme from 'hooks/alert/useAlertScheme';
import { createContext, useState } from 'react';

const AbstractFormContext = createContext();

const AbstractFormContextProvider = ({ children }) => {
  const [showAlert, openAlert] = useAlertScheme();
  const [loading, setLoading] = useState(false);
  const [isNewRegister, setIsNewRegister] = useState(true);

  return (
    <AbstractFormContext.Provider value={{ showAlert, openAlert, loading, setLoading, isNewRegister, setIsNewRegister }}>
      {children}
    </AbstractFormContext.Provider>
  );
};

export { AbstractFormContext, AbstractFormContextProvider };
