import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";

import "./styles.css";

function Navbar(props) {
  return (
    <div>
      <MDBNavbar className="container-navbar">
        <MDBContainer fluid>
          <MDBNavbarBrand></MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Navbar;
