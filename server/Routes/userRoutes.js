const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../Models/UserAIModel");
const RealUsers = require('../Models/UserModel')
// Register Route :

router.post("/registerAIUser", async(req,res)=>{
   try {
    const {username,email,password} = req.body;
    console.log(req.body);
    const usercheck = await User.findOne({username});
    
    if(usercheck)
    return res.json({message:"Username already exists",success:false});

    const emailcheck = await User.findOne({email});

    if(emailcheck)
    return res.json({message:"email already exists",success:false});

    const hashedPassword = await bcrypt.hash(password,10);
          
    const user = new User(
        {
          username: username,
          email: email,
          password: hashedPassword,
        });

        await user.save();
       
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        // console.log(userWithoutPassword);
        return res.json({success:true,userWithoutPassword});

   } catch (error) {
      return res.json({message:error,success:false});
   } 
});


//Login Route:

router.post("/loginAIUser",async(req,res)=>{
   try {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    
    if(!user)
    return res.json({message:"Please enter correct crediantials",success:false});
   
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid)
    {
      return res.json({message:"password not valid ",success:false});
    }
  
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
  
    return res.json({success:true,userWithoutPassword});
      
   } catch (error) {
      return res.json({message:error,success:false});
   }
  
  });

router.post("/register",async(req,res)=>{
  console.log("main user register tak aa gaya hu");
  try {
   const {username,email,password} = req.body;
   console.log(req.body);
   const usercheck = await RealUsers.findOne({username});
    console.log("main yaha tak bhi aa gya hu");
   console.log(usercheck);
   if(usercheck)
   return res.json({message:"Username already exists",success:false});

   const emailcheck = await RealUsers.findOne({email});

   if(emailcheck)
   return res.json({message:"email already exists",success:false});

   const hashedPassword = await bcrypt.hash(password,10);
         
   const user = new RealUsers(
       {
         username: username,
         email: email,
         password: hashedPassword,
       });

       await user.save();
      
       const userWithoutPassword = { ...user.toObject() };
       delete userWithoutPassword.password;
       console.log(userWithoutPassword);

       return res.json({success:true,userWithoutPassword});
     
  } catch (error) {
     return res.json({message:error,success:false});
  } 

});

 router.post("/login", async(req,res)=>{
  try {
   const {username,password} = req.body;
   const user = await User.findOne({username});
   
   if(!user)
   return res.json({message:"Please enter correct crediantials",success:false});
  
   const isPasswordValid = await brcypt.compare(password,user.password);
   if(!isPasswordValid)
   {
     return res.json({message:"password not valid ",success:false});
   }
 
   const userWithoutPassword = { ...user.toObject() };
   delete userWithoutPassword.password;
 
   return res.json({success:true,userWithoutPassword});
     
  } catch (error) {
     return res.json({message:error,success:false});
  }
 });

router.post("/setAvatar/:id",async(req,res,next)=>{
   try {
     const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData= await RealUsers.findByIdAndUpdate(userId,{
       isAvatarImageSet:true,
       avatarImage,
      })
 
      return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage});
   } catch (error) {
     next(error);
   }
 }
 );

router.get("/allUsers/:id",async(req,res,next)=>{
   try {
     const users = await RealUsers.find({_id:{$ne:req.params.id}}).select([
       "email",
       "username",
       "avatarImage",
       "_id"
     ]);
   
     return res.json(users);
    
   } catch (error) {
     next(error);
   }
 })


module.exports= router;

// last commit now: