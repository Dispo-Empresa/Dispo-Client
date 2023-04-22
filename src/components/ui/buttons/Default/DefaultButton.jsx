import { Button } from "@mui/material"

export function DefaultButton(props) {
  return (
    <Button
       href={props.href}
       onClick={props.onClick}
       className={props.className}
       style={{
         backgroundColor: props.backgroundColor,
         color: "#FFFFFF",
         width: props.width ?? 380,
         height: props.height ?? 75,
         borderRadius: 5,
         fontWeight: "initial",
         fontSize: 12,
         marginLeft: props.marginLeft ?? "0%",
         marginTop: props.marginTop ?? "0%",
       }}
    >
      {props.title}
    </Button>
  )
}

export function MultistepButton(props) {
  return (
    <Button
       href={props.href}
       onClick={props.onClick}
       className={props.className}
       style={props.style}
    >
      {props.title}
    </Button>
  )
}

export function FilterButton(props) {
  return (
    <Button
       href={props.href}
       onClick={props.onClick}
       color="primary" 
       size="large" 
       startIcon={props.icon}
       style={{
         backgroundColor: props.backgroundColor,
         color: "#FFFFFF",
         width: props.width ?? 100,
         height: props.height ?? 40,
         borderRadius: 10,
         fontSize: 10,
         marginLeft: props.marginLeft,
         marginTop: props.marginTop,
       }}
    >
      {props.title}
    </Button>
  );
}