import React, { useState } from "react";

// Usabilidade

// import { useNotification } from "../../components/Structured/Notifications/NotificationProvider"

// const dispatch = useNotification();

// dispatch({
//   type: "SUCCESS",
//   message: "Conta atualizada!",
//   title: "Sucesso!"
// });

// dispatch({
//   type: "ERROR",
//   message: "Serviço não encontrado ou fora do ar",
//   title: "Erro encontrado!"
// });

export function Notification(props) {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id
      })
    }, 400)
  };

  React.useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification()
    }
  }, [width])

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      {props.title && <h4><p>{props.title}</p></h4>}
      <p>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};
