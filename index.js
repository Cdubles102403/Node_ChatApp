const express = require('express')
const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const parser = require('body-parser')

server.listen(8080);

app.use(express.static('views'))
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())


io.on('connection', function (socket) {
  console.log("user connected " + socket.id)
  socket.on("message", function(msg,room){
    message = sanitize(msg);
    console.log(socket.id+" message: "+message)
    socket.broadcast.emit("msg",message,room)
    socket.emit("msg",message,room)
  })
  //run when someone joins
  socket.on("new_user", function(user){
      var name = sanitize(user)
      socket.broadcast.emit("new_connection", name )
  })
})
//sanitize text to prevent xss
function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  }
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

//handle admin posts
app.post("/command",function(req,res){
    //console.log("request")
    var user = req.body.user
    var pwd = req.body.password
    
    console.log(user+" "+pwd)
    //succesful login
    if(user=="admin" && pwd="password"){
        
    }
})