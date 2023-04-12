import { MDBContainer } from 'mdb-react-ui-kit';
import { SaveButton, SaveNewButton, QueryDataButton } from '../../../../Basic/Button/FormButtons';

import "./styles.css";

export default function Form(props) {
  
  return (
    <MDBContainer fluid style={{ width: props.width }}>
      <div className="container-content">
        <div className="form-header">
          <SaveButton onClick={props.onSave} />
          <SaveNewButton onClick={props.onSaveNew} />
          <QueryDataButton onClick={props.onQueryData} />              
        </div>
        <div>
          { props.children }
        </div>
      </div>
    </MDBContainer>
  );
}