import Modal from "react-bootstrap/Modal"
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React, { useState } from 'react';

export default function MdbModal() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <Modal show={basicModal} onHide={toggleShow}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}