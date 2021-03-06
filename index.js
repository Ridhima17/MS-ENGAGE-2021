const express = require('express');
const app = express();
const server = require("http").createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const routeUrls = require("./route/auth.routes");
const path = require('path');
require("dotenv").config({path:'./config.env'});
require('./db/conn');
const cors = require("cors");
const io = require("socket.io")(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/',routeUrls);


//backend of things
io.on('connection',(socket)=>{  //sockets are used for real time data transmissions that can be messages,audio or video
    socket.emit('me',socket.id); //this will give us our own id 
    socket.on('disconnect',()=>{
        socket.broadcast.emit("callended");
    });

    socket.on("calluser",({userToCall,signalData,from,name}) => {
        io.to(userToCall).emit("calluser",{signal: signalData, from, name});
    });

    //updating the user media here -> controls options 
    socket.on("updateMyMedia",({type,currentMediaStatus}) => {
        console.log("updateMyMedia");
        socket.broadcast.emit("updateUserMedia",({type,currentMediaStatus}));
    });

    //chat socket
    socket.on("msgUser",({name,to, msg, sender}) => {
        io.to(to).emit("msgRcv",{name,msg,sender});
    });

    socket.on("answerCall",(data) => {
        socket.broadcast.emit("updateUserMedia", {
            type: data.type,
            currentMediaStatus: data.myMediaStatus
        });
        io.to(data.to).emit("callaccepted",data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,() => console.log(`Server listening on port ${PORT}`));

//Production setup
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

