import TipIcon from "../indicators/tip/TipIcon";
import RequiredIcon from "../indicators/required/RequiredIcon";

import "../styles.css";

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
          display: props.align === "horizontal" ? "flex" : "block",
          flexDirection: props.align === "horizontal" ? "row" : "column",
          padding: "10px 0px 15px 15px",
        }}
      >
        {props.options.map((option, index) => (
          <div
            key={index}
            onChange={props.onChange}
            style={{ marginRight: props.align === "horizontal" ? "15px" : "0" }}
          >
            <input
              type="radio"
              id={option.label}
              name="radioGroup"
              value={option.value}
            />
            <label
              htmlFor={option.label}
              style={{ paddingLeft: "5px", paddingTop: "10px" }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioButtons;
