import { createRoot } from 'react-dom/client';
import React, { useContext, useEffect } from 'react';
import { AbstractFormContext } from "../../ui/context/abstractFormContext";

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
  const { setIsRegister, setDisableFields } = useContext(AbstractFormContext);

  useEffect(() => 
  { 
    setDisableFields(true);
  });
  
  const handleOnCloseModal = () => {
    setIsRegister(true);
    setDisableFields(false);
    props.setShowModal(false);   
  };

  const handleSetIsRegister = (event) => {
    event.preventDefault();
    setDisableFields(false);
    setIsRegister(false);   
  };

  return(       
    <ModalDialog 
      title={props.title} 
      open={props.isOpen} 
      onClose={handleOnCloseModal}
    >
      <button
        onClick={handleSetIsRegister}
        style={{
          backgroundColor: '#3498db', // Azul claro
          color: 'white',
          padding: '10px 20px', // Adicionado espaçamento interno horizontal
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          display: 'block', // Para centralizar
          margin: 'auto', // Para centralizar
        }}
      >
        Clique aqui para editar os registros
      </button>

        <Render selectedRowData={props.selectedRowData}>
            <div id="modalCRUD">
                {props.children}
            </div> 
        </Render>                           
    </ModalDialog>                       
  );
}

export default ModalCrud;