import { Button, Tooltip } from "@mui/material";
import { FiSave, FiSearch, FiChevronsUp, FiChevronsDown } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";

import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function CollapseButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        onClick={props.onClick}
        className="form-button"
        style={{
          backgroundColor: COLORS.DetailsColor,
          color: COLORS.SecondColor,
        }}
      >
        {props.collapsed ? (
          <FiChevronsDown className="form-icons" />
        ) : (
          <FiChevronsUp className="form-icons" />
        )}
      </Button>
    </Tooltip>
  );
}

function SaveButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        onClick={props.onClick}
        className="form-button"
        style={{
          backgroundColor: "#4EB254",
          color: COLORS.DetailsColor,
        }}
      >
        <FiSave className="form-icons" />
      </Button>
    </Tooltip>
  );
}

function QueryDataButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        onClick={props.onClick}
        className="form-button"
        style={{
          backgroundColor: "#228DED",
          color: COLORS.DetailsColor,
        }}
      >
        <FiSearch className="form-icons" />
      </Button>
    </Tooltip>
  );
}

function EditButton(props) {
  return (
    <div>
      <Button
        onClick={props.onClick}
        className="form-button"
        style={{
          backgroundColor: "#02AEEC",
          color: COLORS.DetailsColor,
        }}
      >
        <SlPencil className="form-icons" />
      </Button>
    </div>
  );
}

function MoreButton(props) {
  return (
    <div>
      <Tooltip title="Mais opções">
        <Button
          disableElevation
          onClick={props.onClick}
          className="form-button"
          style={{
            backgroundColor: "#A8A8A8",
            color: COLORS.DetailsColor,
          }}
        >
          <RiMoreFill className="form-icons" />
        </Button>
      </Tooltip>
    </div>
  );
}

export { CollapseButton, SaveButton, QueryDataButton, EditButton, MoreButton };
