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

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity === 1) {
    return deleteCartItem(cartItems, productToRemove);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

// The actual value you want to access
export const CartContext = createContext({
  cartDropdownVisible: false,
  setCartDropdownVisible: () => null,
  addItemToCart: (product) => null,
  removeItemFromCart: (product) => null,
  deleteItemFromCart: (product) => null,
  cartItems: [],
  itemCount: 0,
  total: 0,
});

// Like some alias component that gives us a way how to access ProductContext
export const CartProvider = ({ children }) => {
  const [cartDropdownVisible, setCartDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);


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
    setTotal(total + productToAdd.price)
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
    setItemCount(itemCount - 1);
    setTotal(total - productToRemove.price)
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
    setItemCount(itemCount - productToDelete.quantity);
    setTotal(total - productToDelete.price * productToDelete.quantity)
  };

  const value = {
    cartDropdownVisible,
    setCartDropdownVisible,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    itemCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
