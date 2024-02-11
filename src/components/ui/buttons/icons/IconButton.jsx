import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { Button, Tooltip } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

import { ReactComponent as Loader } from "components/ui/buttons/loader.svg";
import { COLORS } from "themes/colors";

import CheckIcon from "@mui/icons-material/Check";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

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

function GenericDatabaseButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        onClick={props.onClick}
        className="datatable-button"
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
          <KeyboardDoubleArrowDownIcon />
        ) : (
          <KeyboardDoubleArrowUpIcon />
        )}
      </Button>
    </Tooltip>
  );
}

function SaveButton(props) {
  return (
    <Tooltip title={props.title}>
      <Button
        type={props.type}
        onClick={props.onClick}
        className="form-button"
        style={{
          backgroundColor: "#4EB254",
          color: COLORS.DetailsColor,
        }}
      >
        {!props.loading ? <SaveIcon /> : <Loader className="spinner" />}
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
      className="datatable-button"
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

function DisableButton(props) {
  return (
    <Tooltip title="Desativar">
      <Button
        onClick={props.onClick}
        className="datatable-button"
        style={{
          backgroundColor: "#F64E60",
          color: COLORS.DetailsColor,
        }}
      >
        <DoNotDisturbOnIcon fontSize="small" />
      </Button>
    </Tooltip>
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
        height: "45px",
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
        height: "45px",
      }}
    >
      <FontAwesomeIcon icon={faFileExcel} size="lg" />
    </Button>
  );
}

function ConfirmButton(props) {
  return (
    <Button
      onClick={props.onClick}
      className="form-button"
      style={{
        backgroundColor: "#299C66",
        color: COLORS.DetailsColor,
      }}
    >
      <CheckIcon />
    </Button>
  );
}

function ClearButton(props) {
  return (
    <Button
      onClick={props.onClick}
      variant="outlined"
      startIcon={<FilterAltOffIcon />}
      style={{
        cursor: "pointer",
        color: "#F64E60",
        borderColor: "#F64E60",
      }}
    >
      <label
        style={{
          cursor: "pointer",
          textTransform: "none",
          fontWeight: "600",
        }}
      >
        Remover
      </label>
    </Button>
  );
}

export {
  GenericButton,
  GenericDatabaseButton,
  CollapseButton,
  SaveButton,
  QueryDataButton,
  EditButton,
  MoreButton,
  DeleteButton,
  DisableButton,
  RefreshButton,
  ExportButton,
  ConfirmButton,
  ClearButton,
};
