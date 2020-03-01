$(document).ready(function(){
  var Currentroom = 1;
  var socket = io.connect('http://localhost:8080/');
  var user = prompt("Please enter your name", "name");
  if(user=="" || user==null){
    user = "anon";
  }
  socket.emit("new_user", user);
  //send message to server
  $("button#post").click(function(){
    console.log("clicked");
    var msg = $("input#message").val()+ " -"+user;
    //return when input is nothing (stop some spam)
    if($("input#message").val()==""){return}
    socket.emit("message",msg,Currentroom);
    $("input#message").val("");
  });
  //post new messages
socket.on("msg", function(msg, sentRoom){
    if(Currentroom == sentRoom){
      console.log("broke "+Currentroom +":"+ sentRoom);
      return;
    }
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
//switch room Number
function changeRoom(i) {
Currentroom = i;
$("h4#room").text("current room number: " +Currentroom)
console.log(Currentroom);
}
