import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState } from "react";

import defaultImage from "../../../../assets/icons/upload_icon_default.png";
import RequiredIcon from "../indicators/required/RequiredIcon";
import TipIcon from "../indicators/tip/TipIcon";
import { COLORS } from "../../../../themes/colors";

import "../styles.css";

function ImageField(props) {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleClearImage() {
    setFile(null);
  }

  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.tip && <TipIcon message={props.tip} />}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <img
          src={file ?? defaultImage}
          width={100}
          height={100}
          alt="teste"
          style={{
            verticalAlign: "middle",
            opacity: file ? 1 : 0.3,
            marginLeft: !file && "3%",
          }}
        />
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <input
              className="form-control"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
              style={{
                width: file ? "190px" : "125px",
                marginTop: "5px",
                fontSize: "14px",
                borderRight: "none",
              }}
            />
            {file && (
              <Button
                onClick={handleClearImage}
                style={{
                  backgroundColor: "#F63344",
                  color: COLORS.DetailsColor,
                  position: "absolute",
                  width: "65px",
                  top: "5px",
                  right: "0px",
                  zIndex: 1,
                  border: "none",
                  marginLeft: "-2px",
                }}
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ImageField };
