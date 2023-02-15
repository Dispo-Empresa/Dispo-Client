import React, { useState } from "react";

import Add from '@mui/icons-material/Add';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import SearchIcon from '@mui/icons-material/Search';

import { DefaultBox } from "../../../../Basic/Box/DefaultBox"
import { SearchTextField  } from "../../../../Basic/TextField/TextField";
import { IconButtonTest } from "../../../../Basic/Icons/IconButton"
import { COLORS } from "../../../../../config/defaultColors";

import "./styles.css"

export function HeaderTable(props) {
    
  const [filterByOpened, setFilterByOpened] = useState(false);

  const handleSetFilterByOpened = () =>{
    setFilterByOpened(!filterByOpened);
  };

  return (
   <div>
     <DefaultBox height={filterByOpened ? "156px" : "75px"} width="1300px" marginTop="1%" marginLeft="7%" >
       <SearchTextField marginTop="1.8%" marginLeft="2%" />
       <div className="container-buttons">
         <IconButtonTest backgroundColor={COLORS.PrimaryColor} marginLeft="20px" iconButton={<Add />} />
         <IconButtonTest backgroundColor={COLORS.PrimaryColor} marginLeft="20px" iconButton={<DensityMediumIcon />} />
         <IconButtonTest backgroundColor={COLORS.PrimaryColor} marginLeft="20px" iconButton={<SearchIcon />} 
                         onClick={handleSetFilterByOpened} />
       </div>
       { filterByOpened && <hr className="filterLine" /> }
     </DefaultBox>
   </div>
  );
}