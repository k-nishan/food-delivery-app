import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    /* getting the body.userId via middleware */
    const userData = await userModel.findOne({ _id: req.body.userId });
    console.log(userData);
    let cartData = await userData.cartData;

    /* in the cart data if there are nothing with the item id*/
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to the cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while adding to cart" });
  }
};

// remove items from cart
const romoveFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error while remove from cart" });
  }
};

// fetch cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error while getting cart data"})
  }
};

export { addToCart, romoveFromCart, getCart };
