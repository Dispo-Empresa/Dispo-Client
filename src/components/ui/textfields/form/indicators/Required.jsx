import { Tooltip } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { FaAsterisk } from "react-icons/fa";

function Required() {
  return (
    <Tooltip
      title="Campo obrigatório"
      style={{
        fontSize: "8px",
        color: "red",
        cursor: "default",
      }}
    >
      <IconButton>
        <FaAsterisk />
      </IconButton>
    </Tooltip>
  );
}

export default Required;
