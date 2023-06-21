import { ReactComponent as Loader } from "./loader.svg";
import { COLORS } from "../../../../themes/colors";

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
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {!props.loading ? props.title : <Loader className="spinner" />}
    </button>
  );
}

export default Button;
