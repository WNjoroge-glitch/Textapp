const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const user = require('../models/user')



module.exports = function(passport){
    passport.use(
        new LocalStrategy(({usernameField:"email"}),(email,password,done) =>{
            user.findOne({ email: email }, (err, user)=>{
                
                if(err) throw err
                if(!user) return done(null,false,{msg:"We could not find an email with this account"})
                    
                    bcrypt.compare(password,user.password,(error,isMatch)=>{
                        if(error) throw error
                        if(isMatch === true){
                            return done(null,user)
                        } else {
                            return done(null,false,{msg:"Incorrect Password. Please try again"})
                        }
                    })
                
            })

        })
    )
    
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
      user.findById(id, function(err, user) {
        done(err, user);
      });
    });
}