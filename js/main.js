var mouse_manager = new function() {
  this._container;
  this.setContainer = function(container){
    this._container = container;
  }

  this.onMouseOver = function(event){
    var item = this._container.findItemAtPoint(event.pageX, event.pageY);
    item.onMouseOver(event.pageX, event.pageY);
  }
  this.onMouseMove = function(event){
    var item = this._container.findItemAtPoint(event.pageX, event.pageY);
    item.onMouseMove(event.pageX, event.pageY);
  }
  this.onMouseClick = function(event){
    var item = this._container.findItemAtPoint(event.pageX, event.pageY);
    item.onMouseClick(event.pageX, event.pageY);
  }
}

function onMouseOver(event){
  mouse_manager.onMouseOver(event);
}

function onMouseMove(event){
  mouse_manager.onMouseMove(event);
}

function onMouseClick(event){
  mouse_manager.onMouseClick(event);
}

function load_main(){
  var canvas = document.getElementById("canvas");

  container_window = new ContainerWindow(0, 0, 1000, 800, canvas);
  container_window.draw();

  mouse_manager.setContainer(container_window);
  canvas.onmouseover = onMouseOver;
  canvas.onmousemove = onMouseMove;
  canvas.onclick = onMouseClick;
}
