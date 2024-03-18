import {
  RefreshButton,
  ExportButton,
} from "components/ui/buttons/icons/IconButton";
import "./styles.css";

function ViewPanel({ title, buttons, children, onExportButton, refreshData }) {
  return (
    <div>
      <label className="title">{title}</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {buttons}
        {refreshData && <RefreshButton onClick={refreshData} />}
        {onExportButton && <ExportButton />}
      </div>

      <hr style={{ marginBottom: "50px", width: "100%" }} />
      <>{children}</>
    </div>
  );
}

export default ViewPanel;
