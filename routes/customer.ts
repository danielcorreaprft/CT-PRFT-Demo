import { Router } from 'express'
import { CustomerController } from '../controller'
import passport from 'passport'
import EmailService from '../services/EmailService';

const customerController = new CustomerController(new EmailService())

const router = Router()
const {
    createCustomer,
    processExternalAuth,
    processLogin,
    requestForgottenPasswordToken,
    resetPasswordWithToken
} = customerController

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

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));

router.get('/auth/credentials', passport.authenticate('oauth2'));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/process-external-login',
    failureRedirect: '/login'
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/process-external-login',
    failureRedirect: '/login'
}));

router.get('/auth/credentials/callback', passport.authenticate('oauth2', {
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
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CustomerSignInResult'
 */
router.post('/login', processLogin.bind(customerController));

router.get('/process-external-login', processExternalAuth.bind(customerController));

router.post('/request-forgotten-password-token', requestForgottenPasswordToken.bind(customerController))

router.post('/reset-password', resetPasswordWithToken.bind(customerController))

export default router
