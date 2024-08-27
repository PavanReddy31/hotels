const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');


router.post('/',async (req,res)=>{
    try{
        const menuData = req.body;
        const newMenu = new Menu(menuData);

        const responce = await newMenu.save();
        console.log("menu data is saved");
        res.status(200).json(responce);
    }catch(err){
        console.log('error occured');
        res.status(500).json({err:"internal error"});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data = await Menu.find();
        console.log("data is fetched!");
        res.status(200).json(data);
    }catch(err){
        console.log("there is an error");
        res.status(500).json({err:'internal error'});
    }

})

module.exports = router;