const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require('axios');
const PricingModel = require('../models/PricingMode');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const CreateOrder = async(req,res) => {
    try {
        const { amount, currency, pricingID } = req.body; // Get amount from frontend

        const PricingData = await PricingModel.findOne({
            _id : pricingID
        })

        if(!PricingData) {
            return res.json({
                success : false,
                message : "Pricing package is invalid"
            })
        }

        const options = {
            amount: Math.round(Number(amount)) * 100, // Convert to paisa (Razorpay uses paisa)
            currency: currency || "INR",
            receipt: "order_rcptid_" + Math.floor(Math.random() * 1000),
        };


        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
}

const Verify = async(req,res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Payment verification error" });
    }
}


const CreateSession = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const amountInPaise = Math.round(Number(amount) * 100);
        
        const response = await axios.post(
            "https://api.razorpay.com/v1/standard_checkout/preferences",
            {
                "amount": amountInPaise, // Convert to paise
                "currency": currency || "INR",
                "payment_capture": 1, // Auto-capture payment
                "description": "Order Payment",
                "callback_url": `${process.env.FRONTEND_URL}/payment-success`, // Redirect after payment
                "cancel_url": `${process.env.FRONTEND_URL}/payment-failed` // Redirect on cancel
            },
            {
                auth: {
                    username: process.env.RAZORPAY_KEY_ID,
                    password: process.env.RAZORPAY_KEY_SECRET
                }
            }
        );

        res.json({ checkout_url: response.data.short_url });
    } catch (error) {
        console.error("Error creating checkout session:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};


module.exports = {CreateOrder, Verify, CreateSession}