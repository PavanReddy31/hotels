const mongoose = require('mongoose')
require('dotenv').config();

//const mongooseURL = 'mongodb://localhost:27017/hotels'
const mongooseURL = process.env.mongodb_URL;

mongoose.connect(mongooseURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
});

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("connected to mongodb server !")
});

db.on('error',(err)=>{
    console.log('mongodb connection error',err)
});

db.on('disconnected',()=>{
    console.log('mongodb is disconnected')
});

module.exports = db;