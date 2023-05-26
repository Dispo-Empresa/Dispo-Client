import { IconButton, Tooltip } from "@mui/material";
import { FaRegQuestionCircle } from "react-icons/fa";

function Tip(props) {
  return (
    <Tooltip
      title={props.message}
      style={{
        fontSize: "14px",
        color: "#0C9ABE",
        cursor: "default",
      }}
    >
      <IconButton>
        <FaRegQuestionCircle />
      </IconButton>
    </Tooltip>
  );
}

export default Tip;
