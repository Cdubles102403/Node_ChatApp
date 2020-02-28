const express = require('express')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080);
app.use(express.static('views'))

io.on('connection', function (socket) {
  console.log("user connected " + socket.id)
  socket.on("message", function(msg){
    console.log(socket.id+" message: "+msg);
    socket.broadcast.emit("msg",msg)
  });
});
