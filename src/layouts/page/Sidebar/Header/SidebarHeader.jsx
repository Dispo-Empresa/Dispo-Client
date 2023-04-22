import * as FaIcons from "react-icons/fa";

import logoFull from "../../../../assets/img/logo/DispoLogo.png";
import logo from "../../../../assets/img/logo/LOGOFlecha.png";

import "./styles.css"

function SidebarHeader(props) {

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

export default SidebarHeader