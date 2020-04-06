var socket = io.connect('http://192.168.1.2:8080/');

function setup(){
  myCanvas = createCanvas(1400, 580);
  myCanvas.parent("canvas");
  background("black");
}
//runs draw functions on mouse dragged
function mouseDragged(){
  var color = $("input#color").val();
  var size = $("input#size").val();
  stroke(color);
  strokeWeight(size);
  line(mouseX, mouseY, pmouseX, pmouseY);
  socket.emit("drawn",pmouseX, pmouseY, mouseX, mouseY,color,size);
}
//runs when client gets draw command, draws with given param.
socket.on("draw",function(pmouseX, pmouseY, mouseX, mouseY,color,size){
  stroke(color);
  strokeWeight(size);
  line(mouseX, mouseY, pmouseX, pmouseY);
});
