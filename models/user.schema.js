const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:"String",
        required:true,
        trim:true
    },
    age:{
        type:"Number",
        required:true,
        defulat:18
    },
    email:{
        type:"String",
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:"String",
        required:[true,"Password is Required"],
        minlength:6
    },
    role:{
        type:"String",
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})   

const User = mongoose.model('User',userSchema);

// User.name = "User";

module.exports = User;