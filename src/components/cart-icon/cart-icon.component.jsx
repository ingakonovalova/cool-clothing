import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { StyledShoppingIcon, ItemCount, CartIconContainer} from "./cart-icon.styles";

const CartIcon = () => {
  const { cartDropdownVisible, setCartDropdownVisible, itemCount } =
    useContext(CartContext);

  const handleClick = () => {
    setCartDropdownVisible(!cartDropdownVisible);
  };

  return (
    <CartIconContainer onClick={handleClick}>
      <StyledShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
