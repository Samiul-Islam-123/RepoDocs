const adminRoutes = require('express').Router();
const PricingModel = require('../models/PricingMode');
const Logger = require('../utils/Logger');

const logger = new Logger();

adminRoutes.post('/upload-pricing', async (req, res) => {
    const {title, price, bolts, features, isPopular} = req.body;
    try{
        const data = new PricingModel({
            title, price, bolts, features, isPopular
        })
        await data.save();
        res.json({
            message : "Pricing Uploaded",
            success : true
        })
    }
    catch(error){
        logger.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
})

module.exports = adminRoutes;
