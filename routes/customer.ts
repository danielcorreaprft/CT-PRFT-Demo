import  { Router, Request } from 'express'
import { CustomerController } from '../controller'
import passport from 'passport'
import AuthRequest from "../types/AuthRequest";

const customerController = new CustomerController()

const router = Router()
const { createCustomer, processLogin } = customerController

router.post('/register/', createCustomer.bind(customerController))

router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/process-login',
    failureRedirect: '/login'
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/process-login',
    failureRedirect: '/login'
}));

router.get('/login', (req, res) => {
    res.send("Login failed");
});
router.get('/process-login', (req:AuthRequest, res) => {
    const email = req.user.email;
    console.log(req);
    res.send(`Welcome ${email}`);
});
export default router