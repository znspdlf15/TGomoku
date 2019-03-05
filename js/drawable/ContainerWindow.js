function ContainerWindow(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);
  this.init_board = this.makeChild(new InitBoard(this.x, this.y, this.width, this.height, canvas));

  this.draw = function(){
    Drawable.prototype.draw.call(this);
    var ctx = this.canvas.getContext("2d");
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    this.drawAllItem();
  }

}
ContainerWindow.prototype = new Drawable();
ContainerWindow.prototype.init_board;
ContainerWindow.prototype.score_board;
ContainerWindow.prototype.gomoku_board;

ContainerWindow.prototype.nextTurn = function(){
  this.score_board.nextTurn();
}

ContainerWindow.prototype.getGomokuBoardState = function(){
  return this.gomoku_board.getGomokuBoardState();
}

ContainerWindow.prototype.undo = function(){
  this.gomoku_board.undo();
}

ContainerWindow.prototype.resetBoard = function(){
  this.gomoku_board.resetBoard();
}

ContainerWindow.prototype.startGame = function(players){
  this.gomoku_board = this.makeChild(new GomokuBoard(this.x, this.y, this.width - 200, this.height, canvas));
  this.score_board = this.makeChild(new ScoreBoard(this.x + this.width - 200, this.y, 200, this.height, canvas));
  this.score_board.init();

  this.items.splice(this.init_board, 1);

  this.redraw();
}

ContainerWindow.prototype.home = function(){
  this.init_board = this.makeChild(new InitBoard(this.x, this.y, this.width, this.height, canvas));

  this.items.splice(this.gomoku_board, 1);
  this.items.splice(this.score_board, 1);

  this.redraw();
}
