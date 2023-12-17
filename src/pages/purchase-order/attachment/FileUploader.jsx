import AttachmentIcon from "@mui/icons-material/Attachment";
import { FileUpload } from "primereact/fileupload";

import "pages/purchase-order/attachment/styles.css";

const FileUploader = () => {
  const handleFileUpload = (event) => {
    const uploadedFiles = event.files;

    uploadedFiles.forEach((file) => {
      console.log("Nome do arquivo:", file.name);
    });
  };
  const renderEmptyTemplate = () => (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AttachmentIcon style={{ fontSize: "5em", color: "var(--surface-d)" }} />
      <span
        style={{
          fontSize: "1.2em",
          color: "var(--text-color-secondary)",
          margin: "1rem 0",
        }}
      >
        Arraste e solte arquivos PDF aqui para fazer o upload.
      </span>
    </div>
  );

  const chooseButtonStyle = {
    background: "#029DBE",
    color: "#fff",
    borderRadius: "5px",
  };
  const uploadButtonStyle = {
    background: "#22C55E",
    color: "#fff",
    borderRadius: "5px",
  };
  const cancelButtonStyle = {
    background: "#F59E0B",
    color: "#fff",
    borderRadius: "5px",
  };

  return (
    <div className="card">
      <div className="button-container">
        <FileUpload
          name="pdfFiles[]"
          url={"/api/upload"}
          multiple
          accept="application/pdf"
          maxFileSize={1000000}
          chooseLabel="Escolher"
          uploadLabel="Enviar"
          cancelLabel="Cancelar"
          emptyTemplate={renderEmptyTemplate}
          onUpload={handleFileUpload}
          chooseOptions={{ style: chooseButtonStyle }}
          uploadOptions={{ style: uploadButtonStyle }}
          cancelOptions={{ style: cancelButtonStyle }}
        />
      </div>
    </div>
  );
};

export default FileUploader;
