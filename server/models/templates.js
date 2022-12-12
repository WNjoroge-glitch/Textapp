const mongoose = require('mongoose')


const template = mongoose.Schema({
    category:String,
    Message:String,
    account:{
        type:mongoose.Types.ObjectId,
        ref:'account'
    }
})

module.exports = mongoose.model('template',template)