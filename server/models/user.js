const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    id:String,
    profileImage:{
        type:String,
        default:'defaultProfile.jpg'
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    account:{
        type:mongoose.Types.ObjectId,
        ref:'account'
    },
    owner:{
        type:Boolean,
        default:false
    }
    
   

},{timestamps:true})



module.exports = mongoose.model('user',userSchema)
