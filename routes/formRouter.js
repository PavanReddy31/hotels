const express = require('express')
const router = express.Router()
const Form = require('../models/forms')

router.post('/',async (req,res)=>{
    try{

        const formData = req.body;
        const form = new Form(formData);

        const responce = await form.save();
        console.log("form data is stored in database");
        res.status(200).json(responce);
    }catch(err){
        console.log('error encountered');
        res.status(500).json({err:"internal error"});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data=await Form.find();
        console.log("form data is fetched");
        res.status(200).json(data);
    }catch(err){
        console.log('data cant be feteched!')
        res.status(500).json({err:"internal error"});
    }
    
})

module.exports = router;