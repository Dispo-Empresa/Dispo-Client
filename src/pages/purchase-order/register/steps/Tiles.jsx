import React from "react";
import "./stylesStepThree.css";

import RegisterPanel from "../../../../layouts/panel/register/classic/RegisterPanel";

function Tiles({ field, value, isTitle }) {
  return (
    <RegisterPanel title="Detalhes da ordem de compra" hideSaveButton={true}>
      <div className="grayBackground">
        {isTitle ? (
          <h3>
            {field}: {value}
          </h3>
        ) : (
          <p>
            {field}: {value}
          </p>
        )}
      </div>
    </RegisterPanel>
  );
}

export default Tiles;
