const mongoose = require('mongoose')

const contacts = mongoose.Schema({
    contact:Object,
    account:{
        type:mongoose.Types.ObjectId,
        ref:'account'
    },
    Group:{
        type:String,
        default:'General'
    }
})

module.exports = mongoose.model('contacts',contacts)