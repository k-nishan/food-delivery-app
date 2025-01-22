import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    console.log('Add to cart function')
    if(!cartItems[itemId]){
        // if the selected item is not available in the cart
        setCartItems((prev) => ({...prev, [itemId]:1}))
    }
    else {
        // if selected item is already there in the item; just  increasing the count
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
    }
  }

  const removeFromCart = (itemId) => {
    // decrease the value by 1
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart
  };

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
