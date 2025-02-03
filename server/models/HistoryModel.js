const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    repoURL : {
        type : String,
        required : true
    },
    configuration : {
        type : String,
        required : true
    },
    timeTaken : {
        type : Number,
    },
    boltsCharged : {
        type : Number,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
})

const HistoryModel = new mongoose.model('history', HistorySchema);
module.exports = HistoryModel;