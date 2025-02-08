const { create_checkout_session, validate_payment, SessionCompletedWebHook } = require('../controller/PaymentController');
const { CreateSession, CreateOrder, Verify } = require('../controller/RazorpayController');
const authenticateToken = require('../middlewares/authmiddleware');

const express = require('express')
const PaymentRouter = express.Router();

PaymentRouter.post('/create-session', authenticateToken, create_checkout_session);
PaymentRouter.get('/validate-payment/:Signature/:userId',  validate_payment);
// PaymentRouter.post('/webhook', SessionCompletedWebHook)

PaymentRouter.post('/razorpay-order', CreateOrder);
PaymentRouter.post('/razorpay-verify', Verify);
PaymentRouter.post('/razorpay-session', CreateSession);

module.exports = PaymentRouter;