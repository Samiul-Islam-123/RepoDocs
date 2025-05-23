const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        uniqueue : true
    },
    isVerified : {
        type : Boolean,
        required : true
    },
    avatarURL : {
        type : String
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
    bolts : {
        type : Number,
        default : 20
    }
})

const UserModel = new mongoose.model('user', UserSchema);

module.exports = UserModel;