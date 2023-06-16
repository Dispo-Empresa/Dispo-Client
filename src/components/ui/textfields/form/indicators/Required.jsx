import ErrorIcon from "@mui/icons-material/Error";

function Required() {
  return (
    <i
      title="Campo obrigatório"
      style={{
        color: "red",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      <ErrorIcon style={{ fontSize: "13px" }} />
    </i>
  );
}

export default Required;
