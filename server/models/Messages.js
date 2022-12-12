const mongoose = require('mongoose')

const messages = mongoose.Schema({
  contacts:{
      type:Object
  },
  Message:String,
  sendDate:{
    type:Date,
    default:Date.now
  },
  Recurrence:{
    type:String,
    default:''
  }
                                                                          

  
})


module.exports = mongoose.model('messages',messages)
