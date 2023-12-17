import PropTypes from "prop-types";
import { positions } from "react-alert";

import "./styles.css";

function NotificacaoTemplate({ message, options, style, close }) {
  const { type } = options;

  return (
    <div
      className={`alert-notification ${type}`}
      style={{
        ...style,
      }}
    >
      <div className="notification-message">
        {type === "info" && (
          <i className="fas fa-info-circle icon" style={{ color: "#1893D5" }} />
        )}
        {type === "success" && (
          <i
            className="fas fa-check-circle icon"
            style={{ color: "#408944" }}
          />
        )}
        {type === "error" && (
          <i
            className="fas fa-exclamation-circle icon"
            style={{ color: "#D74141" }}
          />
        )}
        {type === "warning" && (
          <i
            className="fas fa-exclamation-triangle icon"
            style={{ color: "#EF7918" }}
          />
        )}
        {message}
      </div>
      <i
        className="fas fa-times"
        onClick={close}
        style={{
          cursor: "pointer",
          color: "#D74141",
          fontSize: "18px",
        }}
      ></i>
    </div>
  );
}

NotificacaoTemplate.propTypes = {
  message: PropTypes.string.isRequired,
  options: PropTypes.shape({
    type: PropTypes.oneOf(["info", "success", "warning", "error"]).isRequired,
  }).isRequired,
  style: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

const NotificacaoOptions = {
  timeout: 8000,
  position: positions.BOTTOM_RIGHT,
};

export { NotificacaoOptions, NotificacaoTemplate };
