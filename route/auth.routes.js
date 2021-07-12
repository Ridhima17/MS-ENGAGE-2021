const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../model/user.model');
const bcrypt = require('bcryptjs');


//post data to db after signup
router.post('/signup', async (request,response) => {
    const {name,email,phoneNumber,password,confirmPassword} = request.body;
    if(!name || !email || !phoneNumber || !password || !confirmPassword){
        return response.status(422).json({error: "Please fill the fields properly"});
    }
    try{
        const userExist = await signUpTemplateCopy.findOne({email:email});
        if(userExist){
            return response.status(422).json({error: "Email already exists,head to sign in"});
        }else if(password != confirmPassword){
            return response.status(422).json({error: "Passwords do not match"});
        }else{
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password,salt);
            const signedUpUser = new signUpTemplateCopy({name,email,phoneNumber,passwordHash,confirmPassword});
            const userRegister = await signedUpUser.save();
            if(userRegister){
                response.redirect('/signin');
            }else{
                return response.status(500).json({message: "Failed to register"});
            }
        }
    }catch(err){
        console.log(err);
    }
});


//using async - await method (Advanced Javascript)
router.post('/signin',async (request,response) => {
    try{
        const {email,password} = request.body;
        if(!email ||  !password){
            return response.status(400).json({error: "Please enter valid details, try again"});
        }
        const userLogin = await signUpTemplateCopy.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            if(!isMatch){
                return response.status(400).json({error: "User error, try again"});
            }else{
                response.redirect('http://localhost:3000/videochat');
            }

        }else{
            return response.status(400).json({error: "User error"});
        }
    }catch(err){
        console.log(err);
    }
});


module.exports = router;