const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Mobile_Number:{
        type:Number,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    work_experience:{
        type:String,
        required:true
    },
    current_CTC:{
        type:String,
        required:true
    },
    expected_CTC:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }
});

const Forms = mongoose.model('Forms',formSchema);
module.exports=Forms;