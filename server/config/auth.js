const jwt = require('jsonwebtoken')
const user = require('../models/user')


const getUser = async(req,res,next) =>{

  const user = await req.user
   console.log(req.user)
  // if(!user){
  //   console.log('user not logged in')
  //   // return res.send({message:'you are not logged in'})
  // } else {
  //   next()
  // }
 
 

}


 const authRole = (role) =>{
   const auth = async (req,res,next)=>{

    try {
      
      if(!req.user){
        return res.status(500).send('Session expired. Refresh to login')
      } else{
        
       
    
        if(req.user.role !== role){
        
            return res.status(500).send('You are not authorized to perform this operation')
        } else {
            next()
        }
      }
      
     
    } catch (error) {
     
      return res.send(error)
    }
    
   
   
   }
   return auth

}

const authAdminUser = (req,res,next) =>{
  const token = req.cookies.admin
  if(!token){
    return res.send({message:'you are not logged in'})
  } 
  try{
     return next()
  } catch{
    return res.sendStatus(403)
  }
}






module.exports = {
    getUser,
    authRole,
    authAdminUser
}