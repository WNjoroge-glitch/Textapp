const express = require('express')
const router = express.Router()
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const csv = require('csvtojson')
const accountSid ='ACf7057f61d7e46e3a79154e9d98da2e31';
const authToken ='5bcd10dc4375e8637b7059a1e65bffb9';

const client = require('twilio')(accountSid, authToken);
const multer = require('multer')
const schedule = require('../scheduleWhatsapp')

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




router.post('/',(req,res)=>{
      let {contacts,date,recur,message,name,company} = req.body
      const numbers = contacts.split(',')
     

      if(!name){
            name = 'Customer'
      }
      if(!date){
        date = new Date()
      }
 
     
      schedule (date,recur,name,numbers,message)

   
})

router.post('/upload',upload.single('file'),async(req,res)=>{
      let {file, body:{ message,date,recur,name }} = req
      if(!name){
        name='Customer'
      }
     
     
      try {
        if(file){
          csv()
          .fromFile(req.file.path)
          .then((numbers)=>{
          
               let contacts = numbers.map(number => `+254${number.phoneNumber}`)
               
          
            schedule(date,recur,name,contacts,message)                 
                                  
                              
          })
    
        } else {
          res.status(400).send({
            status: false,
             data: "File Not Found :(",
            });
           }
        
      } catch (error) {
        res.status(500).send(error)
      }
    })


module.exports = router