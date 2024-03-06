const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
    message:{
        text:{
            type: String,required:true,
        },
    },

    users:Array,

    sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RealUsers",
            required:true,
        },
    },

    {
        timestamps:true,

    }

);

module.exports= new mongoose.model("RealMessages",messageSchema);