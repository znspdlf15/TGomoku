function Player(color){
  this.color = color;
}

function HumanPlayer(color){
  Player.call(this, color);
}
HumanPlayer.prototype = new Player();
