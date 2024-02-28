import { Router } from 'express'
import { CustomerController } from '../controller'

const customerController = new CustomerController()

const router = Router()
const { createCustomer } = customerController

router.post('/register/', createCustomer.bind(customerController))

export default router