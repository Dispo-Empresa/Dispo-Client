import { createRoot } from 'react-dom/client';
import React, { useEffect, useContext } from 'react';

import { AbstractFormContext } from '../../ui/context/abstractFormContext';

import ModalDialog from "./ModalDialog";

function Render(props) 
{
  useEffect(() => 
  { 
    const div = document.createElement('div');
    const root = createRoot(div);

    root.render(props.children);

    const modalCRUDElement = document.getElementById("modalCRUD");

    if (modalCRUDElement) 
    {
      const title = modalCRUDElement.querySelector(".card-title");
      title.textContent = "Edição de registros"
    }
  }, [props.children]);
     
  return (props.children);
}

function ModalCrud(props)
{
  const { openAlert } = useContext(AbstractFormContext)

  const handleOnCloseModal = () => {
    openAlert(null);
    props.setShowModal(false);   
  };

  return(       
    <ModalDialog 
      title={props.title} 
      open={props.isOpen} 
      onClose={handleOnCloseModal}
    >
      <Render selectedRowData={props.selectedRowData}>
          <div id="modalCRUD">
              {props.children}
          </div> 
      </Render>                           
    </ModalDialog>                       
  );
}

export default ModalCrud;