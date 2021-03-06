function Drawable(x, y, width, height, canvas) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.canvas = canvas;
  this.items = [];
}
Drawable.prototype.parent;
Drawable.prototype.x;
Drawable.prototype.y;
Drawable.prototype.width;
Drawable.prototype.height;
Drawable.prototype.canvas;
Drawable.prototype.items = [];

Drawable.prototype.draw = function(){}

Drawable.prototype.onMouseMove = function(x, y){}

Drawable.prototype.onMouseClick = function(x, y){}

Drawable.prototype.onMouseOver = function(x, y){}

Drawable.prototype.setParent = function(parent){
  this.parent = parent;
}

Drawable.prototype.addItem = function(item){
  this.items.push(item);
}

Drawable.prototype.makeChild = function(obj){
  this.addItem(obj);
  obj.setParent(this);
  return obj;
}

Drawable.prototype.init = function(){}

Drawable.prototype.drawAllItem = function(){
  for ( var i = 0; i < this.items.length; i++ ){
    this.items[i].draw();
  }
}

Drawable.prototype.isInside = function(x, y){
  if ( this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height ){
    return true;
  } else {
    return false;
  }
}

Drawable.prototype.findItemAtPoint = function(x, y){
  var i;

  for ( i = 0; i < this.items.length; i++ ){
    var item = this.items[i];
    if ( item.isInside(x, y) ){
      return item.findItemAtPoint(x, y);
    }
  }

  return this;
}

Drawable.prototype.redraw = function(){
  var ctx = this.canvas.getContext("2d");

  ctx.clearRect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = "black";
  this.draw();
}
