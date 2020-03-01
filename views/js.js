$(document).ready(function () {
    var currentRoom = 1;
    var socket = io.connect('http://localhost:8080/');
    var user = prompt("Please enter your name", "name");
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
        if (currentRoom != sentRoom) {
            console.log("broke " + currentRoom + ":" + sentRoom);
            return;
        }
        console.log("worked: " + currentRoom + ":" + sentRoom);
        $("ul#messages").append("<li>" + msg + "</li>");
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
            if ($("input#message").val() == "") {
                return
            }
            socket.emit("message", msg);
            $("input#message").val("");
        }
    });
});
//switch room Number
function changeRoom(i) {
    currentRoom = i;
    $("h4#room").text("current room number: " + currentRoom)
    console.log(currentRoom);
}
