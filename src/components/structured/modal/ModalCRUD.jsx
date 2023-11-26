import { createRoot } from 'react-dom/client';
import React, { useEffect, useContext } from 'react';

import ModalDialog from "./ModalDialog";
import useFetch from "../../../hooks/useFetchApi";

import { ENDPOINTS } from "../../../utils/constants/endpoints";
import { AbstractFormContext } from "../../ui/context/abstractFormContext";

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

                const dropDownPanel = element.querySelector(".p-dropdown-panel");
                if (dropDownPanel){
                  const dropDownWrapper = dropDownPanel.querySelector(".p-dropdown-items-wrapper");
                  const ul = dropDownWrapper.querySelector(".p-dropdown-items");              
                  const options = ul.querySelectorAll(".p-dropdown-item");
                  const optionsArray = [...options];
                  
                  optionsArray[value].click();
                }         
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

  useEffect(() => {
    setIsRegister(false);
  }, [setIsRegister]); 

  const handleOnCloseModal = () => {
    setIsRegister(true);
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