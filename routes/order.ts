import { Router } from 'express'
import { OrderController } from '../controller'

const orderController = new OrderController()

const router = Router()
const { createOrderFromCart } = orderController


router.post('/orders', createOrderFromCart.bind(orderController))

export default router