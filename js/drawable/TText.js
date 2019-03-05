function TText(x, y, width, height, canvas, text="", font=Constant.font, color="black"){
  Drawable.call(this, x, y, width, height, canvas);
  this.text = text;
  this.font = font;
  this.color = color;
}
TText.prototype = new Drawable();

TText.prototype.text = "";
TText.prototype.font;
TText.prototype.color = "black";

TText.prototype.setText = function(text){
  this.text = text;
}

TText.prototype.setColor = function(color){
  this.color = color;
}

TText.prototype.draw = function(){
  var ctx = this.canvas.getContext("2d");
  var font_size = 10;

  ctx.font = font_size + "px" + " " + this.font;
  font_size = font_size * this.width / ctx.measureText(this.text).width;
  ctx.font = font_size + "px" + " " + this.font;
  ctx.textBaseline = "top";
  ctx.fillStyle = this.color;
  ctx.fillText(this.text, this.x, this.y);
}
