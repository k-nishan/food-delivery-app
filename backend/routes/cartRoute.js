import express from 'express'
import { addToCart, romoveFromCart, getCart } from '../controllers/cartController.js'
import authMidlleware from '../middlewares/auth.js'

const cartRouter = express.Router()

cartRouter.post('/add', authMidlleware, addToCart)
cartRouter.post('/remove', authMidlleware, romoveFromCart)
cartRouter.post('/get', authMidlleware, getCart)

export default cartRouter