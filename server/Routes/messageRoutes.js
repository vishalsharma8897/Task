const router = require('express').Router();
const openAi = require("openai");
const MessagesAI = require('../Models/MessageAIModel');
const Messages = require('../Models/MessageModel')
require("dotenv").config();

const openai = new openAi({
    apiKey: process.env.API_KEY
});

router.post("/addUserMsg",async(req,res)=>{
    try {
   
        const {userId, message}  = req.body;
        const msg = new MessagesAI(
            {
                message,
                user: userId,
            }
        )
        await msg.save();
    
        if(msg) return res.json({message: "Message added successfully",success:true});
        if(!msg) return res.json({message:"Message Failed to be added in db",success:false});


    } catch (err) {
        console.log(err);
        return res.json({err: "Internal server error",success:false});
    }
});

router.post("/getAiMsg",async(req,res)=>{
    const {userId, message}  = req.body;
    try {
        // Generate a prompt using the input message and user id
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo",
          });
        
        const AI_MSG = completion.choices[0].message.content;
        const msg = new MessagesAI(
            {
                message:AI_MSG,
                user: userId,
                isAIgenerated:true,
            }
        )
        await msg.save();
         
        if(msg) return res.json({message:AI_MSG ,success:true});
        if(!msg) return res.json({message:"AI_Message Failed to be added in db",success:false});

    } catch (err) {
        const msg = new MessagesAI(
            {
                message:err.error.message,
                user: userId,
                isAIgenerated:true,
            }
        )
        await msg.save();

        return res.json({message :err.error.message,success:true});
    }
});

router.post("/getAllAIMessages", async (req, res) => {
    try {
        const id = req.body.id;
        const messages = await MessagesAI.find({ user: id }).sort({ updatedAt: 1 });
        const newMessages = messages.map(({ isAIgenerated, message }) => ({ isAIgenerated, message }));
        return res.status(200).json({newMessages,success:true});
       
    } catch (error) {
        console.log(error);  // Use "error" instead of "err"
        return res.json({ err: "Internal server error in Fetching All messages", success: false });
    }
});

router.post("/addmsg",async(req,res,next)=>{
    try {
       
        const {from , to, message}  = req.body;
        const msg = new Messages(
            {
                message:{text:message},
                users:[from , to],
                sender:from,
            }
        )
        await msg.save();
    
         
        if(msg) return res.json({message: "Message added successfully",success:true});
        if(!msg) return res.json({message:"Message Failed to be added in db",success:false});
    
    
    } catch (err) {
        console.log(err);
        return res.json({err: "Internal server error",success:false});
    }
     }
    )
router.post("/getAllMessages",async(req,res)=>{
    try {
        const { from ,to } = req.body;
        const messages = await Messages.find({
            users:{
                $all:[from ,to],
            },
        }).sort({updatedAt:1});
        const projectMessages= messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
            };
        })
        res.json(projectMessages);
    } catch (error) {
        console.log(err);
        return res.json({err: "Internal server error",success:false});
    }
 })


module.exports= router;