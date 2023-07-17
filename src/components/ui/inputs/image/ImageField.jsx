import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";
import "./styles.css";

const ImageField = (props) => {
  const [file, setFile] = useState();
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={handleUploadClick} className="file-input">
          {file ? `${file.name}` : "Selecione uma imagem"}
        </button>
        {props.required && file ? (
          <button className="clear-image" onClick={() => setFile(null)}>
            <CloseIcon />
          </button>
        ) : null}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export { ImageField };
