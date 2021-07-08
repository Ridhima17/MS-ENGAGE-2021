const express = require('express');
// const jwt = require('jsonwebtoken');
const router = express.Router();
const signUpTemplateCopy = require('../model/user.model');
const bcrypt = require('bcryptjs');
// const authenticate = require("../middleware/authenticate");


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
                // return response.status(201).json({message: "Sign Up successfull"});
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
        // let token;
        const {email,password} = request.body;
        if(!email ||  !password){
            return response.status(400).json({error: "Please enter valid details, try again"});
        }
        const userLogin = await signUpTemplateCopy.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            // token = await userLogin.generateAuthToken();
            // response.cookie("jwtoken",token, {
            //     expires: new Date(Date.now() + 25892000000),
            //     httpOnly: true
            // });
            if(!isMatch){
                return response.status(400).json({error: "User error, try again"});
            }else{
                // return response.json({message: "User signin successfully"});
                // request.flash('message','Saved successfully');
                response.redirect('http://localhost:3000/videochat');
            }

        }else{
            return response.status(400).json({error: "User error"});
        }
    }catch(err){
        console.log(err);
    }
});

// router.get('/videochat', (req,res) => {
//     res.render()
// });

module.exports = router;