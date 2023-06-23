import { useState } from "react";

const useAlertScheme = (initialState = null) => {
  const [showAlert, setShowAlert] = useState(initialState);

  const openAlert = (type, title, message) => {
    setShowAlert({ type, title, message, onClose: closeAlert });
  };

  const closeAlert = () => {
    setShowAlert(null);
  };

  return [showAlert, openAlert];
};

export default useAlertScheme;
