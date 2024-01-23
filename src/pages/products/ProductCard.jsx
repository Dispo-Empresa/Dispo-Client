import ProductQueryCard from "./query/ProductQueryCard";
import ProductRegisterCard from "./register/ProductRegisterCard";
import { ProductContextProvider } from "context/contextProduct";
import { AbstractFormContextProvider } from "context/abstractFormContext";

function ProductCard() {
  return (
    <div>
      <AbstractFormContextProvider>
        <ProductContextProvider>
          <ProductRegisterCard isEdit={false} />
        </ProductContextProvider>
      </AbstractFormContextProvider>

      <ProductQueryCard />
    </div>
  );
}

export default ProductCard;
