import express from 'express'
import authMidlleware from '../middlewares/auth.js'
import { placeOrder, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMidlleware, placeOrder)
orderRouter.post("/verify", verifyOrder)


export default orderRouter