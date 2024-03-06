const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./Routes/userRoutes");
const messagesRoute = require("./Routes/messageRoutes");
const connectToMongo = require("./db");
const socket = require("socket.io");
let port = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth',userRoutes);    // router object wiil be replaced by require(...) and  wiill act as a middleware function 
app.use('/api/messages',messagesRoute);

// Connection to database:
connectToMongo();



const server = app.listen(port,(req,res)=>{
    console.log('server is running at port ' + port);
})

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

  

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            const message = {
                id: uuidv4(), // Generate a unique ID for the message
                message: data.message,
            };
            socket.to(sendUserSocket).emit("msg-recieve", message);
        }
    });
});
