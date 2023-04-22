import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export function DefaultIconButton(props) {
  return (
    <div>
      <IconButton
        onClick={props.onClick}
        edge={props.edge}
      >
        {props.showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  )
}