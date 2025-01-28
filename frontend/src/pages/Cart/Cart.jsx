import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url + '/images/' + item.image} alt='' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='carttotal-details'>
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='carttotal-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className='carttotal-details'>
              <b>Total</b>
              <b>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : getTotalCartAmount()}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>Enter the promo code</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
