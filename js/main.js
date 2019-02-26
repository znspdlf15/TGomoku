// var board[19][19];

function on_canvas_mouse_over(){
  console.log("mouse over on canvas");
}

function load_main(){
  var canvas = document.getElementById("canvas");
  canvas.onmouseover = on_canvas_mouse_over;

  container_window = new ContainerWindow(0, 0, 1000, 800, canvas);
  container_window.draw();
}
