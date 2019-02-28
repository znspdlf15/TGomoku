function Stone(x, y, width, height, canvas, color){
  Drawable.call(this, x, y, width, height, canvas);
  // 다른 객체와의 호환성을 맞추기 위해서 x, y 조정
  this.x = x - width/2;
  this.y = y - height/2;
  this.color = color;
}
Stone.prototype = new Drawable();

Stone.prototype.draw = function(){
  var ctx = this.canvas.getContext("2d");

  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.stroke();
  ctx.fill();
}
