const mongoose = require('mongoose')

const menu = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    taste:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    num_sales:{
        type:Number,
        required:true
    }
});

const Menu = mongoose.model('Menu',menu);
module.exports = Menu;