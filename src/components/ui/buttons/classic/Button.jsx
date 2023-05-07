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
        backgroundColor: COLORS.SecondColor,
        color: COLORS.DetailsColor,
      }}
    >
      {props.title}
    </button>
  );
}

export default Button;
