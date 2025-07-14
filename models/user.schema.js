const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        validate: {
            validator:function (value){
                return isNaN(value);
            },
            messgae:"Name should be String"
        }
    },
    
   age: {
        type: Number,
        required: true,
        min: 0,
        max: 150,
        },

    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
         type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{strict:'throw'})   

const User = mongoose.model('User',userSchema);


module.exports = User;