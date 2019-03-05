function InitBoard(x, y, width, height, canvas){
  Drawable.call(this, x, y, width, height, canvas);

  this.title = this.makeChild(new TText(this.x + this.width * 5 / 12, this.y + this.height / 8, this.width/6, 0, canvas));
  this.title.setText("오-목");

  this.human_game_button = this.makeChild(new TButton(this.x + this.width * 5 / 12, this.y + this.height * 5 / 16, this.width/6, this.width/12, canvas));
  this.human_game_button.setText("2인대전");
  this.human_game_button.onMouseClick = function(x, y){
    var players = new Array(2);
    players.push(new HumanPlayer());
    players.push(new HumanPlayer());
    this.parent.startGame(players);
  }

  this.computer_game_button = this.makeChild(new TButton(this.x + this.width * 5 / 12, this.y + this.height * 7 / 16, this.width/6, this.width/12, canvas));
  this.computer_game_button.setText("Computer.Ver1");
  this.computer_game_button.onMouseClick = function(x, y){
    var players = new Array(2);
    players.push(new HumanPlayer());
    players.push(new HumanPlayer());
    this.parent.startGame(players);
  }

  this.computer_game_button2 = this.makeChild(new TButton(this.x + this.width * 5 / 12, this.y + this.height * 9 / 16, this.width/6, this.width/12, canvas));
  this.computer_game_button2.setText("Computer.Ver2");
  this.computer_game_button2.onMouseClick = function(x, y){
    var players = new Array(2);
    players.push(new HumanPlayer());
    players.push(new HumanPlayer());
    this.parent.startGame(players);
  }

  this.madeby_text = this.makeChild(new TText(this.x + this.width * 3 / 8, this.y + this.height * 13 / 16, this.width/4, 0, canvas));
  this.madeby_text.setText("made by 이용탁");

  this.browser_text = this.makeChild(new TText(this.x + this.width * 2 / 8, this.y + this.height * 15 / 16, this.width * 3 / 6, 0, canvas));
  this.browser_text.setText("이 페이지는 Chrome에 최적화되었습니다.");

}
InitBoard.prototype = new Drawable();

InitBoard.prototype.draw = function(){
  this.drawAllItem();
}

InitBoard.prototype.startGame = function(players){
  this.parent.startGame(players);
}
