function Player(color){
  this.color = color;
}
Player.prototype.isBlocked = false;
Player.prototype.alertUndo = function(){
  this.isBlocked = true;
}

function HumanPlayer(color){
  Player.call(this, color);
}
HumanPlayer.prototype = new Player();

var worker;

function stopWorker(){
  if ( worker ) {
    worker.terminate();
    worker = null;
  }
}

function AIPlayer(color){
  Player.call(this, color);
}
AIPlayer.prototype = new Player();

AIPlayer.prototype.turnToAI = function(gomoku_board){
  console.log("now AI's turn");
}

function Algorithm1(color){
  AIPlayer.call(this, color);
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

    worker.onmessage = function( e ) {
      if ( this.isBlocked ){
        this.isBlocked = false;
        return;
      }
      
      var x = e.data.x;
      var y = e.data.y;

      if ( gomoku_board.isValidStone(x, y) ) {
        var stone = gomoku_board.getGomokuStone(x, y);
        gomoku_board.putStone(stone);
        stopWorker();
      } else {
        worker.postMessage(gomoku_board.gomoku_map);
      }
    }
  }

}

function Algorithm2(color){
  AIPlayer.call(this, color);
}
Algorithm2.prototype = new AIPlayer();

Algorithm2.prototype.turnToAI = function(gomoku_board){
  AIPlayer.prototype.turnToAI.call(this, gomoku_board);
}
