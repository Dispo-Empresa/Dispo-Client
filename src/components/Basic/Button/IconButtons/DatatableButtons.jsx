import IconButton from '@mui/material/IconButton';

import { SlMagnifier, SlPencil } from "react-icons/sl";

import "./styles.css"

export function SearchButton(props){
  
  return(
    <div>
      <IconButton style={{ backgroundColor: "#4EB254", color: "#ffff" }} onClick={props.onClick}>
        <SlMagnifier />
      </IconButton>
    </div>
  );
}

export function EditButton(props){
  
    return(
      <div>
        <IconButton style={{ backgroundColor: "#02AEEC", color: "#ffff" }} onClick={props.onClick}>
          <SlPencil />
        </IconButton>
      </div>
    );
  }