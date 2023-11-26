import { createRoot } from 'react-dom/client';
import React, { useEffect, useContext } from 'react';

import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { AbstractFormContext } from "../../ui/context/abstractFormContext";

import ModalDialog from "./ModalDialog";
import useFetch from "../../../hooks/useFetchApi";
import RegisterPanel from '../../../layouts/panel/register/classic/RegisterPanel';

function Render(props) 
{
  const { data } = useFetch(ENDPOINTS.products.get, props.selectedRowData);
  const selectedRowData = data?.data;

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

        const elementsWithId = modalCRUDElement.querySelectorAll("[id]");
      
        elementsWithId.forEach((element) => 
        {
          const id = element.id;

          if (selectedRowData && selectedRowData.hasOwnProperty(id)) 
          {
            const value = selectedRowData[id];

            if (element.classList.contains("p-dropdown")) {
              const dropDownClick = element.querySelector(".p-dropdown-trigger");

              if (dropDownClick){            
                dropDownClick.click();

                setTimeout(() => {
                  const dropDownPanel = element.querySelector(".p-dropdown-panel");
              
                  console.log(dropDownPanel);
              
                  if (dropDownPanel) {
                    const dropDownWrapper = dropDownPanel.querySelector(".p-dropdown-items-wrapper");
                    const ul = dropDownWrapper.querySelector(".p-dropdown-items");
                    const options = ul.querySelectorAll(".p-dropdown-item");
                    const optionsArray = [...options];
              
                    console.log(optionsArray[value]);
                    optionsArray[value].click();
                  }
                }, 10);     
              }                      
            } else {
                const inputElement = element.querySelector('input');
                const textAreaElement = element.querySelector('textarea');           
                
                element.value = value;              
                
                if (inputElement) 
                    inputElement.value = value;
                else if (textAreaElement) 
                    textAreaElement.value = value;
            }
          }
        });
      }
  }, [props.children, selectedRowData]);
    
    return props.children;
}

function ModalCrud(props)
{
  const { setIsRegister } = useContext(AbstractFormContext);

  console.log("ModalCrud crud:", { setIsRegister });

  const handleOnCloseModal = () => {
    setIsRegister(true);
    props.setShowModal(false);   
  };

  const handleSetIsRegister = (event) => {
    event.preventDefault();

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
        Clique aqui para editar os produtos
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