const express = require('express')
const Agenda = require('agenda');
const messages = require('../models/Messages');
const multer = require("multer");
const router = express.Router()
const csv = require('csvtojson')
const sendSMS = require('../sendSMS')
const {schedule} = require('../schedule')
const {scheduleConnection} = require('../config/db');
const credentials = {
  apiKey:process.env.AFRICASTALKING_API,
  username:process.env.AFRICASTALKING_USERNAME,
}
// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

//const dbURL = 'mongodb://127.0.0.1:27017/Dasym' || 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority';
const dbURL = 'mongodb+srv://DasymAnalytics:Z%40cb.)@cluster0.dtabt.mongodb.net/Dasym?retryWrites=true&w=majority';
const agenda = new Agenda({
    db: {address: dbURL, collection: 'schedule'},
    useUnifiedTopology: true
});


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/public/files"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
//
const upload = multer({ storage: fileStorageEngine });

router.post('/',upload.single('invoice'),async(req,res,next)=>{
    const {file} = req
    let date
    let recur
    
    try {     
      
     
      if(file){
          
        csv()
        .fromFile(req.file.path)
        .then((numbers)=>{
            for(let number of numbers){
              
               
                let message = number.Message
                let phoneNumber = `+254${number.phoneNumber}`
              
                if(number.DateSchedule === "Null"){
                    date = new Date()
                } else {
                    date = new Date(number.DateSchedule)
                }
                if(number.recur === ''){
                    recur = ''
                } else {
                    recur = number.Recurrence
                }
               
                agenda.define("sendbulk", { priority: "high" },async function sendSMS(job){
    
                  //const { names,msg } = job.attrs.data;
                 
                  
                     try {
                       
                      const result=await sms.send({
                       
                        to:phoneNumber, 
                        message:message
                      });
                      //res.status(200).send('Message sent.Check report for full details')
                       console.log(result)
                    } catch (error) {
                     console.log(error)
                     //res.status(500).send(error.message)
                     
                    }
                   
              
                   
                   
                   
                   
              });
              (async()=>{
                await agenda.start();
                await agenda.every(recur,'sendbulk',{
                  skipImmediate:true,
                  startDate:date
                })
                await agenda.schedule(date, "sendbulk");
              })()
               
               
                //schedule(phoneNumber,message,recur,date) 
               
            

            }
            
                            
        })
  
       }
}catch (error) {
      res.status(500).send(error)
    }
})

//   async function schedule (date,recur){
    
//     await agenda.start(); 
//     await agenda.every(recur,'log',{
//       skipImmediate:true,
//       startDate:date
//     })
//     await agenda.schedule(date, 'log',{
//         skipImmediate:true
//     }); 
   
// }


module.exports = router
