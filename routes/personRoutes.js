const express = require('express')
const router = express.Router();
const Person = require('./../models/person');
const { findByIdAndDelete } = require('../models/forms');
const { json } = require('body-parser');

router.post('/',async (req,res)=>{

    try{
        const data = req.body;

        const newPerson = new Person(data);

        const responce = await newPerson.save();
        console.log('data is saved') 
        res.status(200).json(responce);

    }catch(err){
        console.log("error");
        res.status(500).json({err:'internal server error'});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('got the data')
        res.status(200).json(data);
    }catch(err){
        console.log("error");
        res.status(500).json({err:'internal error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const responce = await Person.find({work:workType});
            console.log(`${workType} data is fetched`);
            res.status(200).json(responce);
        }else{
            res.status(404).json({err:'invalid work type'});
        }
    }catch(err){
        console.log('data cant be feteched!')
        res.status(500).json({err:"internal error"});
    }
    
})

router.put('/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedPersonData = req.body;

        const responce = await Person.findByIdAndUpdate(id,updatedPersonData,{
            new:true, // to return the updated document
            runValidators:true, // to run validations on person schema
        })

        if(!responce){
            return res.status(404).json({err:'person not found'});
        }

        console.log(`${updatedPersonData.name}'s data is updated` );
        res.status(200).json(responce);
    }catch(err){
            console.log("error occured");
            res.status(500).json({err:'internal error'});
        }
    
})

router.delete('/:id',async (req,res)=>{
    try{
        const id = req.params.id;

        const responce = await Person.findByIdAndDelete(id);

        if(!responce)
            return res.status(404).json({err:'person not found'});

        console.log('data has been removed successfully');
        res.status(200).json(responce);
    }catch(err){
        console.log(err);
        res.status(500).json({err:'internal error'});
    }
    
})

module.exports = router;