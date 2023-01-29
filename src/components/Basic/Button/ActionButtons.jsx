import { Button } from "@mui/material"

export function SearchRowButton(props) {
  return (
    <Button
      href={props.href}
      style={{
        backgroundColor: "#4DB3A2",
        color: "#FFFFFF",
        width: props.width ?? 50,
        height: props.height ?? 35,
        borderRadius: 10,
        fontWeight: "initial",
        fontSize: 10,
        marginLeft: props.marginLeft ?? "3%",
        marginTop: props.marginTop ?? "0%",
      }}
    >
      Search
    </Button>
  )
}

export function EditRowButton(props) {
  return (
    <Button
       href={props.href}
       style={{
         backgroundColor: "#E87E04",
         color: "#FFFFFF",
         width: props.width ?? 50,
         height: props.height ?? 35,
         borderRadius: 10,
         fontWeight: "initial",
         fontSize: 10,
         marginLeft: props.marginLeft ?? "3%",
         marginTop: props.marginTop ?? "0%",
       }}
    >
      Edit
    </Button>
  )
}

export function RemoveRowButton(props) {
  return (
    <Button
       onClick={props.onClick}
       style={{
         backgroundColor: "#ED6B75",
         color: "#FFFFFF",
         width: props.width ?? 50,
         height: props.height ?? 35,
         borderRadius: 10,
         fontWeight: "initial",
         fontSize: 10,
         marginLeft: props.marginLeft ?? "3%",
         marginTop: props.marginTop ?? "0%",
       }}
    >
      Remove
    </Button>
)}