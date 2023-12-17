import ManufacturerRegisterCard from "./register/ManufacturerRegisterCard";
import ManufacturerQueryCard from "./query/ManufacturerQueryCard";
import { AbstractFormContextProvider } from "components/ui/context/abstractFormContext";
import { ManufacturerContextProvider } from "components/ui/context/manufacturerContext";

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
