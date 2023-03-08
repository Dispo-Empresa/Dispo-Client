import logoFull from "../../../../assets/DispoLogo.png";
import logo from "../../../../assets/LOGOFlecha.png";
import * as FaIcons from "react-icons/fa";

import "./styles.css"

export default function SidebarHeader(props) {

  return (
    <div>
      <div>
        { 
          props.open 
          ? 
          <img src={logoFull} className="logo" /> 
          : 
          <img src={logo}  className="logo-collapsed" /> 
        }
      </div>
      <div>
        {
          props.open
          ?
          <div className="toggler">
            <span onClick={props.onToggleNav}>
              <FaIcons.FaBars />
            </span>
          </div>
          :
          <div className="toggler-collapsed">
            <span onClick={props.onToggleNav}>
              <FaIcons.FaBars />
            </span>
            </div>
        }
      </div>
    </div>
  );
}