const express = require('express')
const router = express.Router()
const report = require('../models/report')

const mongoose = require('mongoose')
const account = require('../models/account')
const {getUser,authRole,authAdminUser} = require('../config/auth')

module.exports = (io) =>{




router.post('/',async (req, res) => {
   const {phoneNumber,status,failureReason,retryCount} = req.body; 
  
    
    
    const newReport = new report({
        phoneNumber:phoneNumber,
        Status:status,
        failureReason:failureReason,
        retryCount:retryCount
        
    })
   
    
    newReport.save((err,results)=>{
        if(err){
            console.log(err)
        } else {
            console.log('saved')
        }
    })
   

   io.emit('status',status)

  

      
});

router.get('/daily',async(req,res)=>{
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayReport = await report.find({createdAt: {$gte: today}})
    res.send(todayReport)
})

router.get('/:id',async(req,res)=>{
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    if (userAccount){
    const reports = await report.find({_id:req.params.id})
    res.json(reports)

    }
        
  

})

router.get('/',async (req,res)=>{
    const reports = await report.find()
    res.send(reports)
})




return router


}