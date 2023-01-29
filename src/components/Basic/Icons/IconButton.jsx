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

export function IconButtonTest(props) {
  return (
    <IconButton
      onClick={props.onClick}
      style={{
        backgroundColor: props.backgroundColor,
        color: "#ffff",
        width: 100,
        height: 50,
        borderRadius: 10,
        marginTop: props.marginTop,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
      }}
    >
      {props.iconButton}
    </IconButton>
  );
}