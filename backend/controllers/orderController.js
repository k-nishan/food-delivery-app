import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from backend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    // cleaning the cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // stripe payments
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 300,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "lkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 300,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while making payment" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment success" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while payment verification" });
  }
};

// orders for frontend
const userOrders = async(req,res) => {
  try {
    const orders = await orderModel.find({userId: req.body.userId})
    res.json({success: true, data: orders})
  } catch (error) {
    console.log(error)
    res.json({success: false, message: "Error while getting user orders"})
  }
}

export { placeOrder, verifyOrder, userOrders };
