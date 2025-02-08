const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const UserModel = require('../models/UserModel.js');
const Logger = require('../utils/Logger.js');
const crypto = require("crypto");


const logger = new Logger();

const create_checkout_session = async (req, res) => {
    const paymentSignature = crypto.randomBytes(16).toString("hex");
    const userId = req.user.id; // Pass userId from frontend;
    logger.info(paymentSignature)

    console.log(req.body)

    if (!userId)
        return res.json({
            success: false,
            message: "Please provide USER ID"
        })

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100, // Convert to cents
                },
                quantity: item.quantity,
            })),
        });

        res.json({ success: true, url: session.url });
    }
    catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const validate_payment = async (req, res) => {
    try {
        const { Signature, userId } = req.params;
        // Fetch payment session from Stripe
        const sessions = await stripe.checkout.sessions.list({ limit: 100 }); // Adjust limit if needed
        const session = sessions.data.find(s => s.metadata.paymentSignature === Signature);

        if (!session || session.payment_status !== "paid") {
            return res.status(400).json({ success: false, message: "Invalid or Unverified Payment" });
        }

        // // Check if already processed
        // const existingPayment = await Payment.findOne({ paymentSignature });
        // if (existingPayment) {
        //     return res.status(400).json({ success: false, message: "Payment already processed" });
        // }

        // // Process Payment (Example: Update User Subscription or Mark Product as Purchased)
        // await Payment.create({ userId, paymentSignature, status: "Completed", amount: session.amount_total / 100 });

        // await User.findByIdAndUpdate(userId, { $set: { hasPaid: true } }); // Example update

        return res.json({ success: true, message: "Payment verified " });
    }
    catch (error) {
        logger.error(error);
        res.json({ success: false, message: error.message });
    }
}

const SessionCompletedWebHook = async (req, res) => {

    const sig = req.headers["stripe-signature"];

    try {
        //console.log(sig)
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        //console.log("🔹 Received Stripe event:", event.type, event.data.object);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const User = await UserModel.findOne({
                email : session.customer_details.email
            })

            if(User){
                //update bolts
                const pack_price = session.amount_total / 100;
                if(pack_price === 2.99)
                    User.bolts+=20;

                if(pack_price === 6.99)
                    User.bolts+=50;

                if(pack_price === 17.99)
                    User.bolts+=150;

                await User.save();
                logger.info("✅ Payment successful!");
                res.json({ received: true });
            }

            // console.log("🔹 Session ID:", session.id);
            // console.log("🔹 Amount Paid:", session.amount_total / 100, session.currency);
            // console.log("🔹 Customer Email:", session.customer_details.email || "Not Provided");

            // Handle database update or business logic here
        }

    } catch (err) {
        console.error("⚠️ Webhook signature verification failed!", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}

module.exports = { create_checkout_session, validate_payment, SessionCompletedWebHook };