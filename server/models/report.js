const mongoose = require('mongoose')

const report  = mongoose.Schema({
    phoneNumber:String,
    Status:String,
    failureReason:String,
    retryCount:String,
    account:{
        type:mongoose.Types.ObjectId,
        ref:'account'
    }
   
}, {timestamps:true})

module.exports = mongoose.model('report',report)