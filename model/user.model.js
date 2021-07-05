const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
});

//hashing the password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hash(this.password,12);
        this.password = bcrypt.hash(this.password,12);
    }
    next();
});


module.exports = mongoose.model('mytable',userSchema);
