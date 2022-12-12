const cookieParser = require('cookie-parser')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {authSuperUser,authRole,authAdminUser} = require('../config/auth')
const user = require('../models/user')
const account = require('../models/account')

const multer = require('multer')
const path = require('path')
const passport = require("passport")
const session = require('express-session')
const mongoose = require('mongoose')




require("../config/passport")(passport);



const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../../client/public/uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
//
const upload = multer({ storage: fileStorageEngine });
router.use(cookieParser())


router.get('/signup',(req,res)=>{

    res.send('Sign Up')
})
router.post('/signup',async (req,res)=>{
    const { email,password,confirmPassword,name} = req.body
    const signedUser =  await user.findOne({ email })
    try {
        if(signedUser){
            res.status(400).json({message:'User already exists'})
        } 
        if(password !== confirmPassword){
            res.status(400).json({message:'Passwords do not match'})
        }
        bcrypt.hash(password,10,(error,hash) => {
              let newUser = new user({
                  email: email,
                  role:"SuperUser",
                  name:name,
                  password:hash
              })
              newUser.save((err,results)=>{
                if(err){
                    console.log(err)
                } else{
                    const token = jwt.sign({email:email},'jwtsecret')
                    res.cookie('jwt',token,{
                       httpOnly:false,
                       maxAge:24*60*60
                   })
                   const newAccount = new account({
                    users:[
                        {
                            user:mongoose.Types.ObjectId(results._id),
                            role:'SuperUser'
      
                        }
                    ],
                    type:'Organization'
                })
                newAccount.save((err,result)=>{
                    if(err){
                        res.status(500).send(err)
                    } else {
                        
    
                        user.findByIdAndUpdate(results._id,{
                            account:mongoose.Types.ObjectId(result._id)
                        }).then((data)=>{
                            res.status(200).send({data:data,status:'Account created successfully'})
                            
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
      
                    }
                })        
                }
                
           
            })
            
            })
        
    } catch (error) {
        res.status(500).send(error)
    }
})




router.post('/login', async (req,res)=>{
    const { email,password } = req.body


    const signedUser = await user.findOne({email:email })
    
    
    try{
        if(!signedUser){
            res.status(404).send({message:"User does not exist"})
        } else{
        bcrypt.compare(password,signedUser.password,(error,isEqual) =>{
        if(error){
            res.status(404).send({Error:"Wrong Password"})
        }
       if(isEqual){
        
        const token = jwt.sign({email:signedUser.email,id:signedUser._id},process.env.JWT_SECRET)
        res.cookie('jwt',token,{
           httpOnly:false,
           maxAge:24*60*60
       })
       res.status(200).send('Successfully logged in')
      
          } 
          
    
 })
}
} catch(error){
res.status(500).json({error:error.message})
}
 
  

})

router.post('/signup-admin',async (req,res)=>{
    const {name,email,password,role} = req.body
    const creatorId = req.params.id
   

    const signedAdmin = await user.findOne({email})
    if(signedAdmin){
        res.status(404).json({message:"Email is already in use"})
    } else {
        bcrypt.hash(password,10,(error,hash) => {
            const admin = new user({

                name:name,
                email:email,
                password:hash,
                role:"Admin",
                owner:true
            })
            admin.save((err,results)=>{
              if(err){
                  console.log(err)
              } else{
                const token = jwt.sign({email:email},'jwtsecret')
                res.cookie('jwt',token,{
                   httpOnly:false,
                   maxAge:24*60*60
                  
               })

               const newAccount = new account({
                users:[
                    {
                        user:mongoose.Types.ObjectId(results._id),
                        role:'Admin'
  
                    }
                ],
                type:'Organization'
            })
            newAccount.save((err,result)=>{
                if(err){
                    res.status(500).send(err)
                } else {
                    

                    user.findByIdAndUpdate(results._id,{
                        account:mongoose.Types.ObjectId(result._id)
                    }).then((data)=>{
                        res.status(200).send({data:data,status:'Account created successfully'})
                        
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
  
                }
            })                                   
              
             
               
              
              }
          })

          
         


          
          })

         
       
    }

    

    
})
router.post('/update/image/:id',upload.single('logo'),async(req,res)=>{
    const {file} = req 
    console.log(req.params.id)
    try {
        const updatedPost = await user.updateOne({_id:req.params.id},{$set:{
            profileImage:file.filename
        }})
        res.json(updatedPost)
    } catch (error) {
        res.json({err:error})
    }

})

router.post('/update/info/:id',(req,res)=>{
      const{username,email,password} = req.body
     
    try {
        bcrypt.hash(password,10,async(err,hash)=>{
            const updatedInfo = await user.updateMany({_id:req.params.id},{$set:{
                name:username,
                email:email,
                password:hash
            }})
           
        })
        res.status(200).send('Update Successful')

    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/delete/:id',async (req,res)=>{
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    try {
        const deletedRecord = await user.findByIdAndDelete(req.params.id)
   
    
    
        account.updateOne({_id: userAccount._id },
             { $pull: { users:{ user: req.params.id } }}, 
             { safe: true, multi:true }, function(err, obj) {
            if(err){
                console.log(err)
    
            } 
        });
        res.send({data:deletedRecord,status:'User deleted'})
    } catch (error) {
        res.status(500).send(error)
    }
  
   
})

router.post('/update/password/:id',async(req,res)=>{
    const {formerPassword,resetPassword} = req.body
    const id = req.params.id
    const users = await user.findById(id)
    
    try {
        bcrypt.compare(formerPassword,users.password,(err,isMatch)=>{
            if(err){
               res.status(500).send('Passwords do not match')
            } 
            if(isMatch){
                    
                bcrypt.hash(resetPassword,10,async(err,hash)=>{
                    if(err){
                        console.log(err)
                    } else {
                    const updatedPassword = await user.updateOne({_id:req.params.id},{$set:{
                        password:hash
                    }})
                    res.status(200).send('Password updated successfully')
                }
                })
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

})


router.post('/test', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    // if (err) { return next(err); }
    if (err) { return res.status(400).send(err); }
    
    if(info){return res.status(401).send(info)}
      if (!user) { return res.status(400).send('User does not exist'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send('Authenticated User');
      }); 
    })(req, res, next);
  });



    




router.post('/team/:id',authRole('SuperUser' || 'Admin'),async (req,res)=>{
    const {username,password,role,email} = req.body
    const userAccount = await account.findOne({'users':{$elemMatch: {user: req.params.id}}})
    
    
   
    
    try {
        const signedAdmin = await user.findOne({name:username})
    if(signedAdmin){
        res.status(404).json({message:"Username already exists"})
    } else {
        bcrypt.hash(password,10,(error,hash) => {
            const admin = new user({
                name:username,
                password:hash,
                role:role,
                email:email,
                account:userAccount._id
            })
            admin.save((err,results)=>{
              if(err){
                  console.log(err)
              } else{
                const token = jwt.sign({name:username},'jwtsecret')
                res.cookie('jwt',token,{
                   httpOnly:false,
                   maxAge:24*60*60
                  
               })
              
              
                account.findOneAndUpdate(
                   {_id:userAccount._id}, 
                    { $push: { 
                              users: {
                                "user":mongoose.Types.ObjectId(results._id),
                                "role":role
                                }  

                            } 
                    },{new:true})
                    .populate('users.user','name')
                                            .exec()
                                            .then((data,err)=>{
                                               
                                                res.status(200).send({data:data,status:'Account created Successfully'})
                                            })
              }
          })
          
          })
    }
    } catch (error) {
        res.status(500).send(error)
        
    }
    
    

})





router.get('/',(req,res)=>{
    res.json(req.user)
})

router.get('/team/:id',async(req,res)=>{
    try {
    const userAccount = await account.findOne({users:{$elemMatch: {user: req.params.id}}})
   
    .populate('users.user','name')
    .exec()

    
    
    if(userAccount){

        res.send(userAccount.users)
    } 
    } catch (error) {
        //console.log(error)
        res.status(500).send(error)
    }
    
    
})

router.get('/companies',async(req,res)=>{
    const users = await user.find({owner:"true"})
    
   
    res.json(users)

})



router.post('/logout',(req,res)=>{
    req.logout()
    // res.cookie('jwt','',{
    //     maxAge:0
    // })
    res.send({message:'logged out'})
})



module.exports = router