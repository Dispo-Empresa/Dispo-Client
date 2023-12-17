import TipIcon from "components/ui/inputs/indicators/tip/TipIcon";
import RequiredIcon from "components/ui/inputs/indicators/required/RequiredIcon";

import "components/ui/inputs/styles.css";

function TextArea(props) {
  return (
    <div>
      <div className="container--label">
        <label className="label">{props.label}</label>
        <div className="container--indicators">
          {props.required && <RequiredIcon />}
          {props.message && <TipIcon message={props.message} />}
        </div>
      </div>
      <textarea
        id={props.id}
        rows={props.rows ?? 4}
        cols={props.cols ?? 50}
        disabled={props.disabled ?? false}
        className="form-control"
        style={{
          borderColor: props.error && "#FF0000",
        }}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error && <span className="errors">{props.error}</span>}
    </div>
  );
}

export { TextArea };
