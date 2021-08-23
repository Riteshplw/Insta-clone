const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');//used to hide password in database which is visible to all
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')



router.get('/',(req,res)=>{
    res.send("hello")
})

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("Hello user")
// })          //for testing purpose

router.post('/signup',(req,res)=>{
    // console.log(req.body.name)
    const {name,email,password,pic} = req.body

    if(!name || !email || !password){
        return res.status(422).json({error:"Please Enter all the fields"})
    }
    // else{
    // res.json({message:"Successfully Posted"})
    // }
    User.findOne({name:name}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exist with that name"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{//to hide password in database in case if someone hacked ur database
            const user = new User({
                name,
                email,
                password:hashedpassword,
                name,
                pic//for pic while signup
            })
            user.save()
            .then(user=>{
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        }) 
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"Please add Email, Password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully signed In"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id ,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router