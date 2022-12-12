let express = require('express')
let router = express.Router()
const csv = require('csvtojson')
const contacts = require('../models/contacts');
const multer = require("multer");
const {schedule }= require('../schedule');
const { report } = require('process');
const messages = require('../models/Messages')
const files = require("../models/file")
const account = require('../models/account')
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



router.get('/',async(req,res)=>{
   const contact = await contacts.find()
   res.send(contact)

})


router.post('/upload',upload.single('file'),async(req,res)=>{
  const {file, body:{ message,date,recur }} = req

 
  try {
    if(file){
      csv()
      .fromFile(req.file.path)
      .then((numbers)=>{
        
        let names = numbers.map(number => `+254${number.phoneNumber}`)
        res.locals.contacts = names
        res.locals.message = message
        res.locals.recur = recur
        res.locals.date = date
        
        //schedule(names,message,recur,date)                 
                              
                          
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
},schedule())


router.post('/save/:id',upload.single('contactFile'), async (req,res)=>{
  const {file, body:{ fileName }} = req
  const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
  
  
    try {    
              if (file) {
                csv().fromFile(file.path)
                .then((numbers)=>{
                
                  for(let number of numbers){
                   
                    let UploadedContact =new contacts({
                    contact:{
                      Name:number.Name,
                      phoneNumber:number.phoneNumber
                    },
                    Group:fileName,
                    account:userAccount._id
                  })
                  UploadedContact.save()
                 
                  }
                  res.status(201).send('Contact added')
               
               
                })             
                
              } else {
                res.status(400).send({
                  status: false,
                  data: "File Not Found :(",
                });
              }
            } catch (err) {
              res.status(500).send(err);
            }
 
    
  
 
 })

 router.get('/upload',async(req,res)=>{
   let uploadedFile = await contacts.find()
   res.json(uploadedFile)

 })

 router.post('/delete/:id',async(req,res)=>{
   let id = req.params.id.split(',')
  
   
   try {
    contacts.deleteMany(
      {
        _id: {
          $in:id
        }
      },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
   } catch (error) {
     
     res.status(500).send(error)
   }

 })
 

router.post('/msg',async(req,res)=>{
  let response = await messages.find()
  res.json(response)
})


router.post('/add',(req,res)=>{
    let info = {
        name:req.body.name,
        phone: req.body.phoneNumber
    }
    let data = new contacts({
      contact:info
    })
    data.save((err)=>{
      if(err){
        res.json({message:"Contact was not saved"})
      } else {
        res.json({message:"Contact successfully saved"})
      }
    })
  
   
    
})


router.post('/msg',upload.single('file'),async (req,res)=>{
    if(req.file){
        let numbers = []
        csv()
                .fromFile(req.file.path)
                .then((obj)=>{
               
                    let values =  obj.map((name)=>{
                         return `+254${name.phoneNumber}` 
                      })
                      res.send(values)
                })
                
    }

})
//sendtoselectedcontacts
router.post('/select',(req,res)=>{
    let contacts = req.body.contact.split(',')
    let message = req.body.message

    sendMessage(contacts,message)
})


module.exports = router