import PurchaseOrderRegisterCard from "./register/PurchaseOrderRegisterCard";
import PurchaseOrderQueryCard from "./query/PurchaseOrderQueryCard";

function SupplierCard() {
  return (
    <div> 
        <PurchaseOrderRegisterCard />   
        <PurchaseOrderQueryCard />
    </div>
  );
}

export default SupplierCard;
