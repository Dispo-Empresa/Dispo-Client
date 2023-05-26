import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";

import "./styles.css";

function Navbar() {
  return (
    <div>
      <MDBNavbar className="container-navbar" fixed="top" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand></MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Navbar;
