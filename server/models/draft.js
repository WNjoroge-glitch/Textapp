const mongoose = require('mongoose')

let draft = mongoose.Schema({
    contact:String,
    Message:String,
    sendDate:Date,
    recur:Number,
    account:{
        type:mongoose.Types.ObjectId,
        ref:'account'
    }
    
})

module.exports = mongoose.model('draft',draft)