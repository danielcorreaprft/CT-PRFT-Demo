import { Router } from 'express'
import { CustomerController } from '../controller'
import passport from 'passport'


const customerController = new CustomerController()

const router = Router()
const { createCustomer, processLogin } = customerController

router.post('/register/', createCustomer.bind(customerController))

router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/process-login',
    failureRedirect: '/login'
}));

router.get('/login', (req, res) => {
    res.send("Login failed");
});
router.get('/process-login', (req, res) => {
    const name = req.user.displayName;
    res.send(`Welcome`);
});
export default router