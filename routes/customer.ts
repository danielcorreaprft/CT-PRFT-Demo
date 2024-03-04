import  { Router } from 'express'
import { CustomerController } from '../controller'
import passport from 'passport'

const customerController = new CustomerController()

const router = Router()
const { createCustomer, processExternalAuth, processLogin } = customerController

/**
 * TODO: fill properties
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerDraft'
 *     responses:
 *       200:
 *         description: A created cart.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CustomerSignInResult'
 */
router.post('/register/', createCustomer.bind(customerController))

router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/auth/facebook', passport.authenticate('facebook',{
    scope: ['email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/process-external-login',
    failureRedirect: '/login'
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/process-external-login',
    failureRedirect: '/login'
}));

/**
 * TODO: fill properties
 * @swagger
 * /login:
 *   post:
 *     summary: Login customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerSignin'
 *     responses:
 *       200:
 *         description: A created cart.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CustomerSignInResult'
 */
router.post('/login', processLogin.bind(customerController));

router.get('/process-external-login', processExternalAuth.bind(customerController));
export default router
