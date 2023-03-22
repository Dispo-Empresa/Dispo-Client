import { Button } from "@mui/material"
import { FiCheck, FiCheckSquare, FiXSquare, FiSearch } from "react-icons/fi";

import "../../Structured/Layouts/Content/FormRegistration/styles.css"

export function SaveButton(props) {
  return (
    <Button
      startIcon={<FiCheck />}
      className={props.className}
      onClick={props.onClick}
      style={{
        backgroundColor: "#4EB254",
        color: "#FFFFFF",
        width: props.width ?? 105,
        height: props.height ?? 40,
        borderRadius: 5,
        fontWeight: "bold",
        fontSize: 10,
        marginRight: "5px"
      }}
    >
      Save
    </Button>
  )
}

export function SaveNewButton(props) {
    return (
      <Button
        startIcon={<FiCheckSquare />}
        className={props.className}
        onClick={props.onClick}
        style={{
          backgroundColor: "#02AEEC",
          color: "#FFFFFF",
          width: props.width ?? 105,
          height: props.height ?? 40,
          borderRadius: 5,
          fontWeight: "bold",
          fontSize: 10,
          marginRight: "5px"
        }}
      >
        Save / New
      </Button>
    )
}

export function QueryDataButton(props) {
  return (
    <Button
      startIcon={<FiSearch />}
      className={props.className}
      onClick={props.onClick}
      style={{
        backgroundColor: "#1BC5BD",
        color: "#FFFFFF",
        width: props.width ?? 105,
        height: props.height ?? 40,
        borderRadius: 5,
        fontWeight: "bold",
        fontSize: 10,
        marginRight: "5px"
      }}
    >
      Query
    </Button>
  )
}

export function CancelButton(props) {
    return (
      <Button
        startIcon={<FiXSquare />}
        className={props.className}
        onClick={props.onClick}
        style={{
          backgroundColor: "#F63644",
          color: "#FFFFFF",
          width: props.width ?? 105,
          height: props.height ?? 40,
          borderRadius: 5,
          fontWeight: "bold",
          fontSize: 10,
          marginRight: "5px"
        }}
      >
        Cancel
      </Button>
    )
}