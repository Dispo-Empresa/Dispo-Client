import { Alert, Space } from "antd";

import "./styles.css";

function AlertMessagePanel({ type, title, message, onClose }) {
  const handleCloseAlert = () => {
    onClose();
  };

  const AlertPanel = () => {
    switch (type) {
      case "error":
        return (
          <Alert
            message={title ?? "Error"}
            description={message}
            type="error"
            showIcon
            closable
            onClose={handleCloseAlert}
            className="alert error"
          />
        );
      case "warning":
        return (
          <Alert
            message={title ?? "Warning"}
            description={message}
            type="warning"
            showIcon
            closable
            onClose={handleCloseAlert}
            className="alert warning"
          />
        );
      case "info":
        return (
          <Alert
            message={title ?? "Info"}
            description={message}
            type="info"
            showIcon
            closable
            onClose={handleCloseAlert}
            className="alert info"
          />
        );
      case "success":
        return (
          <Alert
            message={title ?? "Success"}
            description={message}
            type="success"
            showIcon
            closable
            onClose={handleCloseAlert}
            className="alert success"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <AlertPanel />
    </Space>
  );
}

export default AlertMessagePanel;
