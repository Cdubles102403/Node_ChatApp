$(document).ready(function(){
  var socket = io.connect('http://10.217.11.52:8080/');

  $("button#post").click(function(){
    console.log("clicked");
    var msg = $("input#message").val();
    socket.emit("message",msg);
    $("div#messages").append("<br>"+msg);
  });
socket.on("msg", function(msg){
    $("div#messages").append("<br>"+msg);
    
    });
});
