import HelpIcon from "@mui/icons-material/Help";

function Tip(props) {
  return (
    <i
      title={props.message}
      style={{
        color: "#0C9ABE",
        marginLeft: "8px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      <HelpIcon style={{ fontSize: "13px" }} />
    </i>
  );
}

export default Tip;
