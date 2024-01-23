import ManufacturerRegisterCard from "./register/ManufacturerRegisterCard";
import ManufacturerQueryCard from "./query/ManufacturerQueryCard";
import { AbstractFormContextProvider } from "context/abstractFormContext";
import { ManufacturerContextProvider } from "context/manufacturerContext";

function ManufacturerCard() {
  return (
    <div>
      <AbstractFormContextProvider>
        <ManufacturerContextProvider>
          <ManufacturerRegisterCard isEdit={false} />
        </ManufacturerContextProvider>
      </AbstractFormContextProvider>

      <ManufacturerQueryCard />
    </div>
  );
}

export default ManufacturerCard;
