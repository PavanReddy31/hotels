const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type:Number
    },
    work: {
        type: String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});


personSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password'))
        return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        next(err);
    }
})

personSchema.methods.comparePasswords = async function(enteredPassword){
    try{
        const isMatch = await bcrypt.compare(enteredPassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}



// create person model

const Person = mongoose.model('Person',personSchema);   
module.exports=Person;