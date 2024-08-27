const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new localStrategy(async(username,password,done)=>{
    try{
        
        const user = await Person.findOne({username:username});
        if(!user)
            return done(null,false,{message:'user not found'});

        const isPasswordMatch = await user.comparePasswords(password);
        if(!isPasswordMatch)
            return done(null,false,{message:'incorrect password'});
        else    
            return done(null,user);

    }catch(err){
        done(err);
    }
    

}));

module.exports = passport;