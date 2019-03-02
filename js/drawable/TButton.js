function TButton(x, y, width, height, canvas, color="white", text="", font=Constant.font) {
  Drawable.call(this, x, y, width, height, canvas);

  this.text = text;
  this.font = font;
  this.color = color;
}
TButton.prototype = new Drawable();

TButton.prototype.text = "";
TButton.prototype.font;
TButton.prototype.color;

TButton.prototype.setText = function(text){
  this.text = text;
}

TButton.prototype.draw = function(){
  var ctx = this.canvas.getContext("2d");
  ctx.rect(this.x, this.y, this.width, this.height); // need to change fillRect.
  ctx.stroke();

  var font_size = 10;

  ctx.font = font_size + "px" + " " + this.font;
  font_size = font_size * this.width / ctx.measureText(this.text).width * 4 / 5;
  ctx.font = font_size + "px" + " " + this.font;
  ctx.textBaseline = "top";
  ctx.fillText(this.text, this.x + this.width * 1 / 10, this.y + this.height * 7 / 20);
}
