const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
});

module.exports= new mongoose.model("AIUsers",userSchema);