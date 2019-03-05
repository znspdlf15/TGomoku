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
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.stroke();

  var font_size = 10;

  ctx.font = font_size + "px" + " " + this.font;

  // standard = 40
  var text_length = ctx.measureText(this.text).width;
  var ratio = text_length / 40;

  font_size = font_size * this.width / text_length * 4 / 5;
  if ( ratio < 1 ){
    font_size = font_size * ratio;
  } else {
    ratio = 1;
  }
  ctx.font = font_size + "px" + " " + this.font;
  ctx.textBaseline = "top";
  ctx.fillText(this.text, this.x + this.width * 1 / 10 + this.width * ( 1 - ratio ) / 3, this.y + this.height * 7 / 20);
}
