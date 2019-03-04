function GomokuBoard(x, y, width, height, canvas, size=19, member_count=2) {
  Drawable.call(this, x, y, width, height, canvas);
  this.margin = 0.05;
  this.board_x = this.x + this.width * this.margin, this.board_y = this.y + this.height * this.margin;
  this.board_width = this.width - this.width * this.margin * 2, this.board_height = this.height - this.height * this.margin * 2;
  this.size = size;
  this.member_count = member_count;
  this.gomoku_map = new Array(this.size).fill(0).map(x => new Array(this.size).fill(0));

  this.draw = function(){
    var ctx = canvas.getContext("2d");

    // draw gomoku board
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
    ctx.lineWidth = 1;

    // draw gomoku stones
    this.drawAllItem();
  }
}
GomokuBoard.prototype = new Drawable();

GomokuBoard.prototype.board_x;
GomokuBoard.prototype.board_y;
GomokuBoard.prototype.board_width;
GomokuBoard.prototype.board_height;
GomokuBoard.prototype.size;
GomokuBoard.prototype.turn = 1;
GomokuBoard.prototype.stones = [];
GomokuBoard.prototype.member_count;

GomokuBoard.prototype.nextTurn = function(){
  this.turn = this.stones.length % this.member_count + 1;
  this.parent.nextTurn();
}

GomokuBoard.prototype.undo = function(){
  if ( !this.stones.length ) return;

  var stone = this.stones.pop();
  var idx = this.items.indexOf(stone);
  this.items.splice(idx, 1);

  var stone_map = this.findGomokuMapPosition(stone.x, stone.y);

  this.gomoku_map[stone_map.idx.y][stone_map.idx.x] = 0;
  this.turn = this.stones.length % this.member_count + 1;
  this.parent.nextTurn();

  this.redraw();
}

GomokuBoard.prototype.resetBoard = function(){
  while ( this.stones.length != 0 ){
    var stone = this.stones.pop();
    var idx = this.items.indexOf(stone);
    this.items.splice(idx, 1);

    var stone_map = this.findGomokuMapPosition(stone.x, stone.y);
    this.gomoku_map[stone_map.idx.y][stone_map.idx.x] = 0;
  }

  this.turn = 1;
  this.parent.nextTurn();

  this.redraw();
}

GomokuBoard.prototype.getGomokuBoardState = function(){
  var now_color = this.getNowColor();
  return { color: now_color, count: this.stones.length };
}

GomokuBoard.prototype.onMouseMove = function(x, y){

}

GomokuBoard.prototype.getNowColor = function(){
  return TColor.getColor(this.turn);
}

GomokuBoard.prototype.onMouseClick = function(x, y){
  var stone = this.findGomokuMapPosition(x, y);

  if ( this.gomoku_map[stone.idx.y][stone.idx.x] == 0 ){
    var now_color = this.getNowColor();

    this.gomoku_map[stone.idx.y][stone.idx.x] = now_color;
    var stone = this.makeChild(new Stone(stone.point.x, stone.point.y, stone.width / 5 * 4, stone.height / 5 * 4, canvas, now_color));
    this.stones.push(stone);
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
