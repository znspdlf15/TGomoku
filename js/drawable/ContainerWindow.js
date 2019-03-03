function ContainerWindow(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);
  this.gomoku_board = this.makeChild(new GomokuBoard(this.x, this.y, this.width - 200, this.height, canvas));
  this.score_board = this.makeChild(new ScoreBoard(this.x + this.width - 200, this.y, 200, this.height, canvas));
  this.score_board.init();

  this.draw = function(){
    Drawable.prototype.draw.call(this);
    var ctx = this.canvas.getContext("2d");
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

    this.gomoku_board.draw();
    this.score_board.draw();


  }

}
ContainerWindow.prototype = new Drawable();

ContainerWindow.prototype.nextTurn = function(){
  this.score_board.nextTurn();
}

ContainerWindow.prototype.getGomokuBoardState = function(){
  return this.gomoku_board.getGomokuBoardState();
}

ContainerWindow.prototype.undo = function(){
  this.gomoku_board.undo();
}
