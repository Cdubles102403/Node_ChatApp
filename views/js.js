$(document).ready(function(){
  var socket = io.connect('http://192.168.1.13:8080/');

  $("button#post").click(function(){
    console.log("clicked");
    var msg = $("input#message").val();
    socket.emit("message",msg);
  });
socket.on("msg", function(msg){
    $("ul#messages").append("<li>"+msg+"<li>");
    });
});
