const express = require('express');
const expressServer = express();


const socket = require('socket.io');
const socketServer = socket.Server;

const http = require('http');
const httpServer = http.createServer(expressServer);

let io = new socketServer(httpServer);

io.on("connection",(socket)=>{
  socket.on("this is a msg event",(data)=>{
    io.emit("this is a msg event",data);
  })
});

expressServer.use(express.static('client'));



httpServer.listen(9935, () => {
  console.log("running");
});