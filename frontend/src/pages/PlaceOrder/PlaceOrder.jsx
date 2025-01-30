import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, url, cartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  const placeOrder = async(event) => {
    event.preventDefault();
    const orderItems = [];
    foodList.map((item) => {
      if(cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }
    let responce = await axios.post(url+'/api/order/place', orderData, {headers:{token}})
    console.log('resp: ', responce)
    if (responce.data.success) {
      const {session_url} = responce.data;
      window.location.replace(session_url)
    } else {
      alert("Error")
    }
  }
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delevery Information</p>
        <div className='multi-fields'>
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder='Email Address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className='multi-fields'>
          <input required name="city" onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name="zip" onChange={onChangeHandler} value={data.zip} type='text' placeholder='Zip code' />
          <input required name="country" onChange={onChangeHandler} value={data.country}type='text' placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className='place-order-right'>
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
              <b>
                $
                {getTotalCartAmount() > 0
                  ? getTotalCartAmount() + 2
                  : getTotalCartAmount()}
              </b>
            </div>
          </div>
          <button type="submit" >
            Proceed to checkout
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
