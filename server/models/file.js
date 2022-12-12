const mongoose = require('mongoose')

let contactFile = mongoose.Schema({
    fileName:String,
    fileGroup:String,
    filePath:String,
    fileType:String,
    fileSize:String

})

module.exports = mongoose.model('contactFile',contactFile)