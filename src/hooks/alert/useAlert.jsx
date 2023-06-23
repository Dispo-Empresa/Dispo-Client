import { useState, useEffect } from "react";

const useAlert = (type = null, title = null, message = null) => {
  const [alertType, setAlertType] = useState(type);
  const [alertTitle, setAlertTitle] = useState(title);
  const [alertMessage, setAlertMessage] = useState(message);

  useEffect(() => {
    let timeout;
    if (alertTitle && alertType) {
      timeout = setTimeout(() => {
        setAlertType(null);
        setAlertTitle(null);
        setAlertMessage(null);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [alertType, alertTitle, alertMessage]);

  const closeAlert = () => {
    setAlertType(null);
    setAlertTitle(null);
    setAlertMessage(null);
  };

  const openAlert = (type, title, message) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
  };

  return [alertType, alertTitle, alertMessage, openAlert, closeAlert];
};

export default useAlert;
