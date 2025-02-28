const authenticateToken = require('../middlewares/authmiddleware');
const FeedbackModel = require('../models/FeedbackModel');
const HistoryModel = require('../models/HistoryModel');
const PricingModel = require('../models/PricingMode');
const UserModel = require('../models/UserModel');
const Logger = require('../utils/Logger');

const APIRouter = require('express').Router();

const logger = new Logger();

APIRouter.post('/bolt-pack', authenticateToken, async (req, res) => {
    const userID = req.user.id;
    const { boltPack } = req.body;
    console.log(boltPack, typeof boltPack)
    try {
        const User = await UserModel.findOne({
            _id: userID
        })

        if (!User)
            return res.json({
                success: false,
                message: "User not found"
            })

        User.bolts += boltPack;
        await User.save();
        return res.json({
            success: true,
            message: "Bolts credited successfully"
        })
    }
    catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: error.message
        })
    }
});

APIRouter.get('/pricing', async(req,res) => {
    try{
        const data = await PricingModel.find();
        res.json({
            pricing : data,
            success : true
        })
    }
    catch(error){
        logger.error(error);
        res.json({
            message : error.message,
            success : false
        })
    }
})

APIRouter.post('/upload-content', authenticateToken, async (req, res) => {
    // const userID = req.user.id;
    //console.log(req.user)
    const userID = req.user.id
    const { content, historyID } = req.body;
    //console.log(content)
    try {
        const HistoryRecord = await HistoryModel.findOne({
            customer: userID,
            _id: historyID
        });
        if (!HistoryRecord) {
            return res.json({
                message: "History not found",
                success: false
            })
        }

        HistoryRecord.content = content;
        HistoryRecord.markModified("content");
        await HistoryRecord.save();
        return res.json({
            success: true,
            message: "Content uploaded",
            history: HistoryRecord
        })
    }
    catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: error.message
        })
    }
})

APIRouter.post('/feedback', authenticateToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const { message } = req.body;
        const Feedback = new FeedbackModel({
            customer: userID,
            message: message
        });
        await Feedback.save();
        res.json({
            success: true,
            message: "Feddback recorded"
        })
    }
    catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: error.message
        })
    }
})

APIRouter.post('/upload-pricing', async (req, res) => {
    try {
        const { title, price, bolts, features, isPopular } = req.body;
        
        if (!title || !price || !bolts || !features) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newPricing = new Pricing({
            title,
            price,
            bolts,
            features,
            isPopular: isPopular || false,
        });

        await newPricing.save();
        res.status(201).json({ message: "Pricing plan uploaded successfully", data: newPricing });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

APIRouter.get('/get-pricing', async(req,res) => {
    const Pricing = await PricingModel.find();
    res.json({
        success : true,
        pricing : Pricing
    });
})


module.exports = APIRouter;