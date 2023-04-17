import { createContext, useState } from "react";

// The actual value you want to access
export const CartContext = createContext({
  cartDropdownVisible: false,
  setCartDropdownVisible: () => null,
});

// Like some alias component that gives us a way how to access ProductContext
export const CartProvider = ({ children }) => {
  const [cartDropdownVisible, setCartDropdownVisible] = useState(false);
  const value = { cartDropdownVisible, setCartDropdownVisible };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};
