const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./Routes/userRoutes");
const messagesRoute = require("./Routes/messageRoutes");
const connectToMongo = require("./db");
let port = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth',userRoutes);    // router object wiil be replaced by require(...) and  wiill act as a middleware function 
app.use('/api/messages',messagesRoute);

// Connection to database:
connectToMongo();



app.listen(port,(req,res)=>{
    console.log('server is running at port ' + port);
})