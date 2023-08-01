import {
  RefreshButton,
  ExportButton,
} from "../../../components/ui/buttons/icons/IconButton";

import "./styles.css";

function ViewPanel({ title, buttons, children, onExportButton, refreshData }) {
  return (
    <div>
      <label className="title">{title}</label>
      <div className="buttons">
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
