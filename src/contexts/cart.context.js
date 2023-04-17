import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// The actual value you want to access
export const CartContext = createContext({
  cartDropdownVisible: false,
  setCartDropdownVisible: () => null,
  addItemToCart: (product) => null,
  cartItems: [],
  itemCount: 0,
});

// Like some alias component that gives us a way how to access ProductContext
export const CartProvider = ({ children }) => {
  const [cartDropdownVisible, setCartDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  // Another version how to update count

  // useEffect(() => {
  //   const newItemCount = cartItems.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  //   setItemCount(newItemCount);
  // }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    setItemCount(itemCount + 1);
  };

  const value = {
    cartDropdownVisible,
    setCartDropdownVisible,
    cartItems,
    addItemToCart,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
