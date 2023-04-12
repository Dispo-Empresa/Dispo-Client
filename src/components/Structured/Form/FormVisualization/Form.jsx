import { SaveButton, DeleteButton } from '../../../../Basic/Button/FormButtons';
import { MDBContainer } from 'mdb-react-ui-kit';

import "./styles.css";

export function FormView(props) {
  return (
    <MDBContainer>
      <div className="form-content">
        { props.children }
      </div>
    </MDBContainer>
  );
}

export function FormEdit(props) {
  return (
    <MDBContainer fluid style={{ width: props.width }}>
      <div className="form-header">
        <SaveButton onClick={props.onSave} />
        <DeleteButton onClick={props.onDelete} />
      </div>
      <div className="form-content">
        { props.children }
      </div>
    </MDBContainer>
  );
}