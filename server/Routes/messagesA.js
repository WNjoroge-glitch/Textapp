const express = require('express');

const router = express.Router()
const messages = require('../models/Messages');
const multer = require("multer");
const csv = require('csvtojson')
const {schedule} = require('../schedule')
const {cancelJob} = require('../schedule')
const whatsappSchedule = require('../scheduleWhatsapp')
const report = require('../models/report');
const { cancel } = require('agenda/dist/agenda/cancel');
const credentials = {
    apiKey:process.env.AFRICASTALKING_API,
    username:process.env.AFRICASTALKING_USERNAME,
}

  
  
  // Initialize the SDK
  const AfricasTalking = require('africastalking')(credentials);
  
  // Get the SMS service
  const sms = AfricasTalking.SMS;
  



router.post('/',async(req,res,next)=>{
    let {contacts,message,recur,date,user} = req.body
   
    let names = contacts.split(',')
    res.locals.contacts = names
    res.locals.message = message
    res.locals.recur = recur
    res.locals.date = date
  
    if(!date){
        date = new Date()
    } 
    
   
    next()
},schedule())


router.post('/cancel',(req,res)=>{
    cancelJob()
})














router.get('/getMsg',(req,res)=>{
    messages.find()
    .then((data)=>{
     data.map((data)=>{
    let names = data.contacts.phoneNumber
    let msg = data.Message
    res.send(names)
    //res.send(msg)
})
    })
})

router.post('/test',async(req,res)=>{
    try {
        const result=await sms.send({
          to: '+254700356447', 
          message: 'trial message'
        });
        res.send(result);
      } catch(ex) {
        console.error(ex);
      }
})

 







module.exports = router