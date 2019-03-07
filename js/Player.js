function Player(){
  this.isBlocked = false;
}
Player.prototype.isBlocked;
Player.prototype.alertUndo = function(){
  this.isBlocked = true;
}

function HumanPlayer(){
  Player.call(this);
}
HumanPlayer.prototype = new Player();

var worker;

function stopWorker(){
  if ( worker ) {
    worker.terminate();
    worker = null;
  }
}

function AIPlayer(){
  Player.call(this);
}
AIPlayer.prototype = new Player();

AIPlayer.prototype.turnToAI = function(gomoku_board){
  console.log("now AI's turn");
}

function Algorithm1(){
  AIPlayer.call(this);
}
Algorithm1.prototype = new AIPlayer();

Algorithm1.prototype.turnToAI = function(gomoku_board){
  AIPlayer.prototype.turnToAI.call(this, gomoku_board);

  if ( !!window.Worker ) {
    if ( worker ) {
      stopWorker();
    }

    worker = new Worker('./js/worker.js');
    worker.postMessage(gomoku_board.gomoku_map);

    this.isBlocked = false;
    var putStone = function(x, y){
      if ( this.isBlocked ) return;

      if ( gomoku_board.isValidStone(x, y) ) {
        var stone = gomoku_board.getGomokuStone(x, y);
        gomoku_board.putStone(stone);
        stopWorker();
      } else {
        worker.postMessage(gomoku_board.gomoku_map);
      }
    }

    worker.onmessage = function( e ) {
      var x = e.data.x;
      var y = e.data.y;

      putStone(x, y);
    }
  }

}

function Algorithm2(){
  AIPlayer.call(this);
}
Algorithm2.prototype = new AIPlayer();

Algorithm2.prototype.turnToAI = function(gomoku_board){
  AIPlayer.prototype.turnToAI.call(this, gomoku_board);
}
