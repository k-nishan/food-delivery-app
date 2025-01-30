import express from 'express'
import authMidlleware from '../middlewares/auth.js'
import { placeOrder, verifyOrder, userOrders } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMidlleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMidlleware, userOrders)


export default orderRouter