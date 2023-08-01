import { Button, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../../../themes/colors";

import "./styles.css";

function GenericButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        onClick={props.onClick}
        className="form-button"
        style={{
          backgroundColor: props.color ?? COLORS.SecondColor,
          color: COLORS.DetailsColor,
        }}
      >
        {props.icon ?? props.title}
      </Button>
    </Tooltip>
  );
}

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
          <KeyboardDoubleArrowUpIcon />
        ) : (
          <KeyboardDoubleArrowDownIcon />
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
        <SaveIcon />
      </Button>
    </Tooltip>
  );
}

function QueryDataButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        onClick={props.onClick}
        className="datatable-button"
        style={{
          backgroundColor: "#228DED",
          color: COLORS.DetailsColor,
        }}
      >
        <SearchIcon />
      </Button>
    </Tooltip>
  );
}

function EditButton(props) {
  return (
    <Button
      onClick={props.onClick}
      className="form-button"
      style={{
        backgroundColor: "#02AEEC",
        color: COLORS.DetailsColor,
      }}
    >
      <EditIcon />
    </Button>
  );
}

function MoreButton(props) {
  return (
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
        <MoreHorizIcon />
      </Button>
    </Tooltip>
  );
}

function DeleteButton(props) {
  return (
    <Button
      onClick={props.onClick}
      className="datatable-button"
      style={{
        backgroundColor: "#f64e60",
        color: COLORS.DetailsColor,
      }}
    >
      <DeleteIcon fontSize="small" />
    </Button>
  );
}

function RefreshButton(props) {
  return (
    <Button
      onClick={props.onClick}
      className="form-button"
      style={{
        backgroundColor: "#02AEEC",
        color: COLORS.DetailsColor,
      }}
    >
      <RefreshIcon />
    </Button>
  );
}

function ExportButton(props) {
  return (
    <Button
      onClick={props.onClick}
      className="form-button"
      style={{
        backgroundColor: "#299C66",
        color: COLORS.DetailsColor,
      }}
    >
      <FontAwesomeIcon icon={faFileExcel} size="lg" />
    </Button>
  );
}

export {
  GenericButton,
  CollapseButton,
  SaveButton,
  QueryDataButton,
  EditButton,
  MoreButton,
  DeleteButton,
  RefreshButton,
  ExportButton,
};
