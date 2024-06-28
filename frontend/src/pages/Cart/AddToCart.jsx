import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";

const AddToCart = () => {
  const { cartItems } = useContext(StoreContext);

  return (
    <div className="cart">
      <h1>Cart Items</h1>
      {Object.keys(cartItems).map((itemId) => (
        <ProductItem
          key={itemId}
          id={itemId}
          name={cartItems[itemId].name} // Assuming each item in cart has a name field
          description={cartItems[itemId].description} // Assuming each item in cart has a description field
          price={cartItems[itemId].price} // Assuming each item in cart has a price field
          image={cartItems[itemId].image} // Assuming each item in cart has an image field
          quantity={cartItems[itemId].quantity} // Assuming each item in cart has a quantity field
          isInCart // Flag to indicate it's in cart for styling or other purposes
        />
      ))}
    </div>
  );
};

export default AddToCart;
