import { MDBContainer } from "mdb-react-ui-kit";

import { SaveButton } from "../../../components/ui/buttons/icons/IconButton";

import "./styles.css";

export function FormView(props) {
  return (
    <MDBContainer>
      <div className="form-content">{props.children}</div>
    </MDBContainer>
  );
}

export function FormEdit(props) {
  return (
    <MDBContainer fluid style={{ width: props.width }}>
      <div className="form-header">
        <SaveButton onClick={props.onSave} />
      </div>
      <div className="form-content">{props.children}</div>
    </MDBContainer>
  );
}
