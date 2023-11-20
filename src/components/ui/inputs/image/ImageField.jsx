import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";
import "./styles.css";

const ImageField = (props) => {
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    props.onChange(e.target.files[0]);
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
        <button
          type="button"
          onClick={handleUploadClick}
          className="file-input"
        >
          {props.value
            ? `${
                props.value.name.length > 25
                  ? props.value.name.slice(0, 25 - 3) + "..."
                  : props.value.name
              }`
            : "Selecione uma imagem"}
        </button>
        {
          <button
            type="button"
            className="clear-image"
            onClick={() => props.onChange(null)}
          >
            <CloseIcon />
          </button>
        }
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export { ImageField };
