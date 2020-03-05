var currentRoom = 1;
$(document).ready(function () {
    var socket = io.connect('http://10.217.11.52:8080/');
    if(!localStorage.name || localStorage.name=="" || localStorage.name==null){
        var user = prompt("Please enter your name", "name");
        localStorage.setItem("name",user)
    }
    else{
        var user = localStorage.getItem("name");
    }
    
    
    if (user == "" || user == null) {
        user = "anon";
    }
    // send new user message on connection
    socket.emit("new_user", user);

    //send message to server
    $("button#post").click(function () {
        console.log("clicked");
        var msg = $("input#message").val() + " -" + user;
        //return when input is nothing (stop some spam)
        if ($("input#message").val() == "") {
            return
        }
        socket.emit("message", msg, currentRoom);
        $("input#message").val("");
    });



    //post new messages
    socket.on("msg", function (msg, sentRoom) {
        //if (currentRoom != sentRoom) {
          //  console.log("broke " + currentRoom + ":" + sentRoom);
        //    return;
      //  }
        console.log("worked: " + currentRoom + " : " + sentRoom);
        if(sentRoom == 1){$("ul#messages1").append("<li>" + msg + "</li>");}
        else if(sentRoom == 2){$("ul#messages2").append("<li>" + msg + "</li>");}
        if(sentRoom==3){$("ul#messages3").append("<li>" + msg + "</li>");}
    });

    
    //runs on new connection
    socket.on("new_connection", function (name) {
        console.log(name);
        $("ul#messages").append("<li> new user: " + name + "</li>");
    });

    //send message on enter (same logic as the post button)
    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            console.log("clicked");
        var msg = $("input#message").val() + " -" + user;
        //return when input is nothing (stop some spam)
        if ($("input#message").val() == "") {
            return
        }
        socket.emit("message", msg, currentRoom);
        $("input#message").val("");
        }
    });
});
//switch room Number and chat room block
function changeRoom(i) {
    currentRoom = i;
    $("h4#room").text("current room number: " + currentRoom)
    $("ul#messages").empty();
    console.log(currentRoom);
    if(i==1){
        $("ul#messages1").show();
        $("ul#messages2").hide();
        $("ul#messages3").hide();
    }
    else if(i==2){
        $("ul#messages1").hide();
        $("ul#messages2").show();
        $("ul#messages3").hide();
    }
    else if(i==3){
       $("ul#messages1").hide();
        $("ul#messages2").hide();
        $("ul#messages3").show(); 
    }
    
}
