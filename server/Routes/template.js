const express =  require('express')
const router = express.Router()
const template = require('../models/templates')
const draft = require('../models/draft')
const mongoose = require('mongoose')
const {authRole} = require('../config/auth')
const account = require('../models/account')



router.post('/:id',async(req,res)=>{
const { message,category } = req.body
const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})



const templateMsg = new template({
    category:category,
    Message:message,
    account:userAccount._id
})
templateMsg.save((err,doc)=>{
    if(err){
        res.status(500).send(err)
    } else{
        res.send('Template added successfully')
    }
})

})



router.get('/:id',async(req,res)=>{
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    if(userAccount){
        const templates = await template.find({account:userAccount._id})
    
    res.send(templates)
    }
   
   
    
})

router.post('/delete/:id',authRole('SuperUser' || 'Admin'),async(req,res)=>{
    let id = req.params.id
    try {
        const deletedTemplate = await template.findOneAndDelete({_id:id})
        res.status(200).send('Template deleted successfully')
    } catch (error) {
        res.status(500).send(error)
        
    }
    
   
})

router.post('/edit/:id',authRole('SuperUser' || 'Admin'),async(req,res)=>{
    const {editedMessage,location} = req.body
    if(location.pathname === '/template'){
        try {
            const updatedTemplate = await template.updateOne({_id:req.params.id},{$set:{
                Message:editedMessage
            }})
            res.status(200).send('Template updated successfully')
           
        } catch (error) {
           
            res.status(500).send(error)
        }
    }
    if(location.pathname === '/drafts'){
        try {
            const updatedTemplate = await draft.updateOne({_id:req.params.id},{$set:{
                Message:editedMessage
            }})
            res.status(200).send('Draft updated successfully')
           
        } catch (error) {
           
            res.status(500).send(error)
        }
    }

    
    
    

})

module.exports = router