const mongoose = require('mongoose')




const accountSchema = mongoose.Schema({
    users:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:'user'
            },
            role:{
                type:String
            }
        }
    ],
   
    type:{
        type:String,
        default:"Single"
    }


})

module.exports = mongoose.model('account',accountSchema)