$(document).ready(function(){
  var socket = io.connect('http://192.168.1.13:8080/');
  var user = prompt("Please enter your name", "name");
  socket.emit("new_user", user);
  //send message to server
  $("button#post").click(function(){
    console.log("clicked");
    var msg = $("input#message").val()+ " -"+user;
    if($("input#message").val()==""){return}
    socket.emit("message",msg);
    $("input#message").val("");
  });
  //post new messages
socket.on("msg", function(msg){
    $("ul#messages").append("<li>"+msg+"</li>");
    });
    socket.on("new_connection",function(name){
      console.log(name);
      $("ul#messages").append("<li> new user: "+name+"</li>");
    });
    $(document).on('keypress',function(e) {
    if(e.which == 13) {
      console.log("clicked");
      var msg = $("input#message").val()+ " -"+user;
      if($("input#message").val()==""){return}
      socket.emit("message",msg);
      $("input#message").val("");
    }
});
});
