const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../model/user.model');
const bcrypt = require('bcryptjs');

//using the async method (Advanced Javascript)
router.post('/signup', async (request,response) => {
    const {name,email,phoneNumber,password,confirmPassword} = request.body;
    if(!name || !email || !phoneNumber || !password || !confirmPassword){
        return response.status(422).json({error: "Please fill the fields properly"});
    }
    try{
        const userExist = await signUpTemplateCopy.findOne({email:email});
        if(userExist){
            return response.status(422).json({error: "Email already exists"});
        }else if(password != confirmPassword){
            return response.status(422).json({error: "Passwords do not match"});
        }else{
            const signedUpUser = new signUpTemplateCopy({name,email,phoneNumber,password,confirmPassword});
            const userRegister = await signedUpUser.save();
            if(userRegister){
                response.status(201).json({message: "User signed in successfully"});
            }else{
                response.status(500).json({message: "Failed to register"});
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
            return response.status(400).json({error: "Please enter valid details"});
        }
        const userLogin = await signUpTemplateCopy.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            if(!isMatch){
                response.status(400).json({error: "User error"});
            }else{
                response.json({message: "User signin successfully"});
            }

        }else{
            response.status(400).json({error: "User error"});
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;