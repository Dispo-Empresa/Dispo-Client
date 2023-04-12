import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export function Footer() {
  return (
    <MDBFooter className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' />
      <section className=''>
        <MDBContainer className="text-center">
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>

            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.10)' }}>
        © {new Date().getFullYear()} Copyright - Dispo
      </div>
    </MDBFooter>
  );
}