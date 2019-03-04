function ScoreBoard(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);

  this.init = function(){
    this.title = this.makeChild(new TText(this.x + this.width / 4, this.y + this.height / 8, this.width/2, 0, canvas));
    this.title.setText("오-목");

    this.turn_text = this.makeChild(new TText(this.x + this.width / 4, this.y + this.height * 3 / 8, this.width/2, 0, canvas));
    this.turn_text.setText("현재 차례");

    this.madeby_text = this.makeChild(new TText(this.x + this.width * 1 / 4, this.y + this.height * 15 / 16, this.width/2, 0, canvas));
    this.madeby_text.setText("made by 이용탁");

    this.browser_text = this.makeChild(new TText(this.x + this.width * 1 / 10, this.y + this.height * 31 / 32, this.width * 5 / 6, 0, canvas));
    this.browser_text.setText("이 페이지는 Chrome에 최적화되었습니다.");

    this.now_stone = this.makeChild(new Stone(this.x + this.width / 2, this.y + this.height * 7 / 16, this.width/5, this.width/5, canvas, this.parent.getGomokuBoardState().color));

    this.undo_button = this.makeChild(new TButton(this.x + this.width * 1 / 4, this.y + this.height * 17 / 32, this.width/2, this.width/4, canvas));
    this.undo_button.setText("뒤로가기");
    this.undo_button.onMouseClick = function(x, y){
      this.parent.undo();
    }

    this.reset_button = this.makeChild(new TButton(this.x + this.width * 1 / 4, this.y + this.height * 20 / 32, this.width/2, this.width/4, canvas));
    this.reset_button.setText("리셋");
    this.reset_button.onMouseClick = function(x, y){
      this.parent.resetBoard();
    }

    this.turn_count_text = this.makeChild(new TText(this.x + this.width / 4, this.y + this.height * 12 / 16, this.width/2, 0, canvas));
    this.turn_count_text.setText("현재 턴수");

    this.turn_count = this.makeChild(new TText(this.x + this.width * 9 / 20, this.y + this.height * 13 / 16, this.width/10, this.width/5, canvas));
    this.turn_count.setText(this.parent.getGomokuBoardState().count);
  }

  this.draw = function(){
    var ctx = this.canvas.getContext("2d");
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

    this.drawAllItem();
  }
}
ScoreBoard.prototype = new Drawable();

ScoreBoard.prototype.nextTurn = function(){
  var idx = this.items.indexOf(this.now_stone);
  this.items.splice(idx, 1);
  this.now_stone = this.makeChild(new Stone(this.x + this.width / 2, this.y + this.height * 7 / 16, this.width/5, this.width/5, canvas, this.parent.getGomokuBoardState().color));
  this.now_stone.draw();

  this.turn_count.setText(this.parent.getGomokuBoardState().count);
  this.turn_count.redraw();
}

ScoreBoard.prototype.undo = function(){
  this.parent.undo();
}

ScoreBoard.prototype.resetBoard = function(){
  if ( confirm("게임을 리셋하시겠습니까?") ){
    this.parent.resetBoard();
  }
}
