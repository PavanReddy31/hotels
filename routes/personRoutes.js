const express = require('express')
const router = express.Router();
const Person = require('./../models/person');
// const { findByIdAndDelete } = require('../models/forms');
// const { json } = require('body-parser');
const {jwtMiddleWare,generateToken} = require('./../jwt');

router.post('/signup',async (req,res)=>{

    try{
        const data = req.body;

        const newPerson = new Person(data);

        const responce = await newPerson.save();
        console.log('data is saved') 
        const payload = {
            id:responce.id,
            username : responce.username
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
        console.log('token is generated',token);
        res.status(200).json({responce:responce,token:token});

    }catch(err){
        console.log(err);
        res.status(500).json({err:"internal error"});
    }
})


router.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const user = await Person.findOne({username:username});
    if(!user || !(await user.comparePasswords(password)))
        return res.status(401).json({err:'invalid credentials'});

    const payload = {
        id:user.id,
        username:user.username
    }

    const token = generateToken(payload);
    res.status(200).json(token);

})


router.get('/',jwtMiddleWare,async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('got the data')
        res.status(200).json(data);
    }catch(err){
        console.log("error");
        res.status(500).json({err:'internal error'});
    }
})

// profile route
router.get('/profile',jwtMiddleWare,async (req,res)=>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await Person.findById(userId);
        if(!user)
            return res.status(401).json({message:'user not found'});

        res.status(200).json(user);
    }catch(err){
        console.error(err);
        res.status(401).json({err:'error'});
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

router.delete('/:email',async (req,res)=>{
    try{
        const email = req.params.email;

        const responce = await Person.findOneAndDelete({email:email});

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