import WarehouseQueryCard from "./query/WarehouseQueryCard";
import WarehouseRegisterCard from "./register/WarehouseRegisterCard";

function WarehouseCard() {
  return (
    <div>
      <WarehouseRegisterCard />
      <WarehouseQueryCard />
    </div>
  );
}

export default WarehouseCard;
