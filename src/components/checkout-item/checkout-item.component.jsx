import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => decreaseQuantityHandler(cartItem)}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => increaseQuantityHandler(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => deleteItemHandler(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
