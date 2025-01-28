import { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    console.log("Add to cart function");
    if (!cartItems[itemId]) {
      // if the selected item is not available in the cart
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // if selected item is already there in the item; just  increasing the count
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
    }
  };

  const removeFromCart = async (itemId) => {
    // decrease the value by 1
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token) {
      await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
    }
  };

  const loadCartData = async(token) => {
    const response = await axios.post(url+"/api/cart/get", {}, {headers: {token}})
    setCartItems(response.data.cartData)
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const responce = await axios.get(url+'/api/food/list');
    setFoodList(responce.data.data);
  };

  /*to prevent the logout when refreshing the page */
  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }

    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
