const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Logger = require('../utils/Logger.js');

const logger = new Logger();

const create_checkout_session = async(req,res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/sucess`,
            cancel_url: `${process.env.CLIENT_URL}/sucess`,
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100, // Convert to cents
                },
                quantity: item.quantity,
            })),
        });

        res.json({ url: session.url });
    }
    catch(error){
        logger.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {create_checkout_session};