import React, { useContext,useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    fruitList,
    vegList,
    leafyList,
    milkList,
    nvegList,
    grainList,
    pulseList,
    seedList,
    spiceList,
    flowerList,
    plantList,
    foodList,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      navigate('/order');
    } else {
      setShowLoginModal(true); // Show login/signup modal
    }
  };

  // Consolidate all product lists
  const allProducts = [
    ...fruitList,
    ...vegList,
    ...leafyList,
    ...milkList,
    ...nvegList,
    ...grainList,
    ...pulseList,
    ...seedList,
    ...spiceList,
    ...flowerList,
    ...plantList,
    ...foodList // Ensure foodList is included
  ];

  useEffect(() => {
    console.log("Location changed to /cart");
    checkDataConsistency();
  }, [cartItems]);

  const renderCartItems = () => {
    return Object.keys(cartItems).map(id => {
      const item = allProducts.find(product => product._id === id);
      if (item && cartItems[id] > 0) {
        return (
          <div key={item._id}>
            <div className="cart-items-item">
              <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price} Rs.</p>
              <p>{cartItems[item._id]}</p>
              <p>{cartItems[item._id] * item.price} Rs.</p>
              <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
            </div>
            <hr />
          </div>
        );
      } else {
        console.warn(`Item with id ${id} not found in product list or has zero quantity`);
        return null;
      }
    });
  };

  const checkDataConsistency = () => {
    const allProductIds = allProducts.map(product => product._id);
    const cartItemIds = Object.keys(cartItems);

    cartItemIds.forEach(id => {
      if (!allProductIds.includes(id)) {
        console.warn(`Cart item id ${id} does not match any product id`);
      }
    });
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {renderCartItems()}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} Rs.</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2} Rs.</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} Rs.</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {showLoginModal && (
        <div className="login-modal">
          <h2>Please sign in or sign up to continue.</h2>
          </div>
      )}
    </div>
  );
};

export default Cart;
