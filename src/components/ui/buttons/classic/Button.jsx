import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type="submit"
      className="classic-button"
      style={{
        backgroundColor: "#029DBE",
        width: props.width,
        height: props.height,
        color: COLORS.DetailsColor,
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {props.title}
    </button>
  );
}

export default Button;
