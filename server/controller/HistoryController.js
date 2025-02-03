const HistoryModel = require("../models/HistoryModel");
const Logger = require("../utils/Logger");

const logger = new Logger();

const getHistory = async(req,res) => {
    try{
        const customerID = req.user.id;
    
    if(!customerID)
        return res.json({
            success : false,
            message : "Id should be provided"
        })

    const history = await HistoryModel.find({
        customer : customerID
    })

    res.json({
        success : true,
        history : history
    })
    }
    catch(error){
        logger.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
}

const getHistoryDetails = async(req,res) => {
    const {historyID, customerID} = req.body;
    try{
        if(!historyID, !customerID){
            return res.json({
                success : false,
                message : "Insufficient data"
            });
        }
    
        const record = await HistoryModel.findOne({
            _id : historyID,
            customer : customerID
        });
    
        if(record)
            return res.json({
                success : true,
                record : record
            })
    
        return res.json({
            success : false,
            message : "Record not found"
        })
    }
    catch(error){
        logger.info(error)
        res.json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {getHistory, getHistoryDetails}