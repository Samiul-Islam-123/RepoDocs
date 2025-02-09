const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    message : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
});

const FeedbackModel = new mongoose.model('feedback', FeedbackSchema);
module.exports = FeedbackModel;