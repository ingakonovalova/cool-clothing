import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { StyledSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Arrow, Value } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  const { removeItemFromCart, addItemToCart, deleteItemFromCart } =
    useContext(CartContext);

  const decreaseQuantityHandler = (product) => {
    removeItemFromCart(product, false);
  };

  const increaseQuantityHandler = (product) => {
    addItemToCart(product);
  };

  const deleteItemHandler = (product) => {
    deleteItemFromCart(product);
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <StyledSpan>{name}</StyledSpan>
      <Quantity>
        <Arrow
          onClick={() => decreaseQuantityHandler(cartItem)}
        >
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow
          onClick={() => increaseQuantityHandler(cartItem)}
        >
          &#10095;
        </Arrow>
      </Quantity>
      <StyledSpan>{price}</StyledSpan>
      <RemoveButton
        onClick={() => deleteItemHandler(cartItem)}
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
