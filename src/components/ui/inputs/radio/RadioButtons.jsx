import React from "react";
import { RadioButton } from "primereact/radiobutton";

import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

function RadioButtons(props) {
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
        className="form-control"
        style={{
          padding: "10px 0px 15px 15px",
          borderColor: props.error && "red",
          width: props.width ?? "300px",
        }}
      >
        {props.options.map((option) => {
          return (
            <div key={option.value} className="flex align-items-center">
              <RadioButton
                inputId={option.value}
                value={option}
                onChange={props.onChange}
                checked={props.value.value === option.value}
              />
              <label
                htmlFor={option.value}
                style={{ paddingLeft: "5px", paddingTop: "10px" }}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      <div>{props.error && <span className="errors">{props.error}</span>}</div>
    </div>
  );
}

export { RadioButtons };
