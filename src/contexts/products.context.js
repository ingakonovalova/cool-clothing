import { createContext, useState, useEffect } from "react";

import PRODUCTS from "../../src/shop-data.json";

// The actual value you want to access
export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

// Like some alias component that gives us a way how to access ProductContext
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};
