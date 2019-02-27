function Drawable(x, y, width, height, canvas) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.canvas = canvas;
  this.items = [];
};

Drawable.prototype.items= [];

Drawable.prototype.draw = function(){}

Drawable.prototype.onMouseMove = function(){}

Drawable.prototype.onMouseClick = function(){}

Drawable.prototype.addItem = function(item){
  this.items.push(item);
}

Drawable.prototype.findItemAtPoint = function(x, y){
  var i;

  for ( i = 0; i < this.items.length; i++ ){
    var item = this.items[i];
    if ( item.x <= x && x <= item.x + item.width && item.y <= y && y <= item.y + item.height ){
      return item.findItemAtPoint(x, y);
    }
  }

  return this;
}

function ContainerWindow(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);
  this.score_board = new ScoreBoard(this.x + this.width - 200, this.y, 200, this.height, canvas);
  this.gomoku_board = new GomokuBoard(this.x, this.y, this.width - 200, this.height, canvas);
  this.addItem(this.score_board);
  this.addItem(this.gomoku_board);

  this.draw = function(){
    Drawable.prototype.draw.call(this);
    var ctx = this.canvas.getContext("2d");
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

    this.score_board.draw();
    this.gomoku_board.draw();
  };
};

ContainerWindow.prototype = new Drawable();

function ScoreBoard(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);

  this.draw = function(){
    var ctx = this.canvas.getContext("2d");
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  };
};
ScoreBoard.prototype = new Drawable();

function GomokuBoard(x, y, width, height, canvas) {
  Drawable.call(this, x, y, width, height, canvas);
  var startX = this.x + 50, startY = this.y + 50;

  this.draw = function(){
    var ctx = canvas.getContext("2d");

    var canvWidth = this.height - 100, canvHeight = this.height - 100;

    var i;
    for ( i = 0; i < 19; i++ ){
      ctx.beginPath();
      ctx.moveTo(startX + canvWidth/18 * i, startY);
      ctx.lineTo(startX + canvWidth/18 * i, startY + canvHeight);
      ctx.stroke();
    }
    for ( i = 0; i < 19; i++ ){
      ctx.beginPath();
      ctx.moveTo(startX, startY + canvHeight/18 * i);
      ctx.lineTo(startX + canvWidth, startY + canvHeight/18 * i);
      ctx.stroke();
    }

    var point = new Array(new Array(9), new Array(2));
    point = [[4, 4], [4, 10], [4, 16], [10, 4], [10, 10], [10, 16], [16, 4], [16, 10], [16, 16]];

    ctx.lineWidth = 5;
    for ( i = 0; i < point.length; i++ ){
      var x = point[i][0] - 1;
      var y = point[i][1] - 1;
      ctx.beginPath();
      ctx.arc(startX + canvWidth/18 * x, startY + canvHeight/18 * y, 1, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };
}
GomokuBoard.prototype = new Drawable();

GomokuBoard.prototype.onMouseMove = function(event){

}

GomokuBoard.prototype.onMouseMove = function(event){
  
}

function Stone(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);
}
