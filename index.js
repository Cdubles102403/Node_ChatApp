const express = require('express')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080);
app.use(express.static('views'))

io.on('connection', function (socket) {
  console.log("user connected " + socket.id)
  socket.on("message", function(msg){
    message = sanitize(msg);
    console.log(socket.id+" message: "+message)
    socket.broadcast.emit("msg",message)
    socket.emit("msg",message)
  });
  //run when someone joins
  socket.on("new_user", function(user){
      var name = sanitize(user)
      socket.broadcast.emit("new_connection", name )
  });
});
//sanitize text to prevent xss
function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}
