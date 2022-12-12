const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const draft = require('../models/draft')
const account = require('../models/account')
const {schedule} = require('../schedule')
const {authRole} = require('../config/auth')
const multer = require("multer");
const csv = require('csvtojson')
const { nextTick } = require('process')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../client/public/files"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });

const upload = multer({ storage: fileStorageEngine });


router.post('/send',upload.single('file'),async(req,res,next)=>{
    const {file, body:{contact,message,date,recur,id,name}} = req
    
    try{
       
        if(file){
           
            csv().fromFile(req.file.path).then((numbers)=>{
                let names = numbers.map(number => `+254${number.phoneNumber}`)
                res.locals.contacts = names
                res.locals.message = message
                res.locals.recur = recur
                res.locals.date = date
               next()
               
                //schedule(names,message,recur,date)
                draft.findOneAndDelete({_id:id})
            .then((data)=>{
                res.status(200).send('Draft sent')
            })
                
            })
           
        } else {
            const names = contact.split(',')
            res.locals.contacts = names
            res.locals.message = message
            res.locals.recur = recur
            res.locals.date = date
            
          next()
         
            //schedule(names,message,recur,date)
            draft.findOneAndDelete({_id:id})
            .then((data)=>{
                res.status(200).send('Draft sent')
            })
    
            
        }
} catch (error) {
        console.log(error)
    }
},schedule())

router.post('/:id',async(req,res)=>{
   
    const {contacts,message,recur,schedule} = req.body
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    try{
        let data = new draft({
            contact:contacts,
            Message:message,
            sendDate:schedule,
           recur:recur,
           account:userAccount._id
    
        })
        data.save((err)=>{
            if(err){
                res.status(500).send(err)
            } else {
                res.send('Draft saved successfully')
    
            }
        })
    } catch(error){
        console.log(error)
    }
  
   
    

})


router.post('/upload/:id',upload.single('file'),async(req,res)=>{
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    const {file, body:{ message,date,recur }} = req
  try {
    const newDraft = new draft({
       
        contact:file.filename,
        Message:message,
        sendDate:date,
       recur:recur,
       account:userAccount._id


})
newDraft.save((err)=>{
    if(err){
       res.status(500).send(err)
    } else {
        res.status(200).send('Draft saved successfully')
    }
})

  } catch (error) {
      res.status(500).send(error.message)
  }
 


})



router.get('/send/:id',async(req,res)=>{
    const drafts = await draft.findOne({_id:req.id})
    res.send(drafts)
})
router.post('/delete/:id',authRole('SuperUser' || 'Admin'),async(req,res)=>{
   
    
    try {
        const deletedDraft = await draft.findOneAndDelete({_id:req.params.id},{new:true})
       res.send(deletedDraft)
    } catch (error) {
       
        res.status(500).send(error)
        
    }
    
   
})
router.get('/:id',async(req,res)=>{
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    if(userAccount) {
        const drafts = await draft.find({ account: userAccount._id })
        res.send(drafts)
    }
   
})


module.exports = router;