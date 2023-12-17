import { ReactComponent as Loader } from "components/ui/buttons/loader.svg";
import { COLORS } from "themes/colors";

import "./styles.css";

function Button(props) {
  return (
    <button
      className="classic-button"
      disabled={props.disabled}
      onClick={props.onClick}
      style={{
        backgroundColor: "#029DBE",
        width: props.width,
        height: props.height,
        color: COLORS.DetailsColor,
      }}
    >
      <span>{props.icon}</span>
      <span className="button-text">
        {!props.loading ? props.title : <Loader className="spinner" />}
      </span>
    </button>
  );
}

export default Button;
