import SuplierRegisterCard from "./register/SupplierRegisterCard";
import SuplierQueryCard from "./query/SupplierQueryCard";
import { AbstractFormContextProvider } from "components/ui/context/abstractFormContext";
import { SupplierContextProvider } from "components/ui/context/supplierContext";

function SupplierCard() {
  return (
    <div>
      <AbstractFormContextProvider>
        <SupplierContextProvider>
          <SuplierRegisterCard isEdit={false} />
        </SupplierContextProvider>
      </AbstractFormContextProvider>

      <SuplierQueryCard />
    </div>
  );
}

export default SupplierCard;
