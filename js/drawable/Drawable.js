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

Drawable.prototype.onMouseMove = function(x, y){}

Drawable.prototype.onMouseClick = function(x, y){}

Drawable.prototype.onMouseOver = function(x, y){}

Drawable.prototype.addItem = function(item){
  this.items.push(item);
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

function GomokuBoard(x, y, width, height, canvas, size=19, member_count=2) {
  Drawable.call(this, x, y, width, height, canvas);
  this.board_x = this.x + 50, this.board_y = this.y + 50;
  this.board_width = this.width - 100, this.board_height = this.height - 100;
  this.size = size;
  this.turn = 1;
  this.member_count = member_count;
  this.gomoku_map = new Array(this.size).fill(0).map(x => new Array(this.size).fill(0));

  this.draw = function(){
    var ctx = canvas.getContext("2d");

    var i;
    for ( i = 0; i < this.size; i++ ){
      ctx.beginPath();
      ctx.moveTo(this.board_x + this.board_width/(this.size-1) * i, this.board_y);
      ctx.lineTo(this.board_x + this.board_width/(this.size-1) * i, this.board_y + this.board_height);
      ctx.stroke();
    }
    for ( i = 0; i < this.size; i++ ){
      ctx.beginPath();
      ctx.moveTo(this.board_x, this.board_y + this.board_height/(this.size-1) * i);
      ctx.lineTo(this.board_x + this.board_width, this.board_y + this.board_height/(this.size-1) * i);
      ctx.stroke();
    }

    var point;
    if ( this.size == 19 ){
      point = new Array(new Array(9), new Array(2));
      point = [[4, 4], [4, 10], [4, 16], [10, 4], [10, 10], [10, 16], [16, 4], [16, 10], [16, 16]];
    }

    ctx.lineWidth = 5;
    for ( i = 0; i < point.length; i++ ){
      var x = point[i][0] - 1;
      var y = point[i][1] - 1;
      ctx.beginPath();
      ctx.arc(this.board_x + this.board_width/(this.size-1) * x, this.board_y + this.board_height/(this.size-1) * y, 1, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}
GomokuBoard.prototype = new Drawable();

GomokuBoard.prototype.board_x;
GomokuBoard.prototype.board_y;
GomokuBoard.prototype.board_width;
GomokuBoard.prototype.board_height;
GomokuBoard.prototype.size;
GomokuBoard.prototype.turn;
GomokuBoard.prototype.member_count;

GomokuBoard.prototype.nextTurn = function(){
  this.turn = this.turn % this.member_count + 1;
}
GomokuBoard.prototype.onMouseMove = function(x, y){

}

GomokuBoard.prototype.onMouseClick = function(x, y){
  // for test
  var stone = this.findGomokuMapPosition(x, y);

  if ( this.gomoku_map[stone.idx.y][stone.idx.x] == 0 ){
    var now_color = TColor.getColor(this.turn);

    this.gomoku_map[stone.idx.y][stone.idx.x] = TColor[now_color];
    var stone = new Stone(stone.point.x, stone.point.y, stone.width / 5 * 4, stone.height / 5 * 4, canvas, now_color);
    this.addItem(stone);
    this.nextTurn();
    stone.draw();
  } else {

  }

}

GomokuBoard.prototype.findGomokuMapPosition = function(x, y){
  var interval_width = this.board_width / (this.size-1);
  var interval_height = this.board_height / (this.size-1);

  var idx_x = parseInt((x + interval_width / 2 - this.board_x ) / interval_width );
  var idx_y = parseInt((y + interval_height / 2 - this.board_y ) / interval_height );
  var point_x = this.board_width / (this.size-1) * idx_x + this.board_x;
  var point_y = this.board_height / (this.size-1) * idx_y + this.board_y;

  return { idx: {x: idx_x, y: idx_y}, point:{x: point_x, y: point_y}, width: interval_width, height: interval_height };
}

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
