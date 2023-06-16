import ProductQueryCard from "./query/ProductQueryCard";
import ProductRegisterCard from "./register/ProductRegisterCard";

function ProductCard() {
  return (
    <div>
      <ProductRegisterCard />
      <ProductQueryCard />
    </div>
  );
}

export default ProductCard;
