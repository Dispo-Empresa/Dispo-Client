import React from 'react';
import { ProductContextProvider } from "../../components/ui/context/contextProduct";
import ProductQueryCard from "./query/ProductQueryCard";
import ProductRegisterCard from "./register/ProductRegisterCard";
import { AbstractFormContextProvider } from '../../components/ui/context/abstractFormContext';

function ProductCard() { 
  return (
    <div>
      <AbstractFormContextProvider>
        <ProductContextProvider>
          <ProductRegisterCard />
        </ProductContextProvider>
      </AbstractFormContextProvider>
      
      <AbstractFormContextProvider>
        <ProductContextProvider>
          <ProductQueryCard />
        </ProductContextProvider>
      </AbstractFormContextProvider>
      
    </div>
  );
}

export default ProductCard;
