const authenticateToken = require('../middlewares/authmiddleware');
const UserModel = require('../models/UserModel');
const Logger = require('../utils/Logger');

const APIRouter = require('express').Router();

const logger = new Logger();

APIRouter.post('/bolt-pack', authenticateToken, async (req, res) => {
    const userID = req.user.id;
    const {boltPack} = req.body;
    try{
        const User = await UserModel.findOne({
            _id : userID
        })

        if(!User)
            return res.json({
                success : false,
                message : "User not found"
            })

        User.bolts += boltPack;
        await User.save();
        return res.json({
            success : true,
            message : "Bolts credited successfully"
        })
    }
    catch(error){
        logger.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
});

module.exports = APIRouter;