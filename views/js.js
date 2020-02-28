$(document).ready(function(){
  var socket = io.connect('http://localhost:8080/');

  $("button#post").click(function(){
    console.log("clicked");
    var msg = $("input#message").val();
    socket.emit("message",msg);
  });
});
