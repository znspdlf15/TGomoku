function Player(color){
  this.color = color;
}

function HumanPlayer(color){
  Player.call(this, color);
}
HumanPlayer.prototype = new Player();

// function startWorker() {
//      if ( !!window.Worker ) {
//        if ( worker ) {
//          stopWorker();
//        }
//
//        worker = new Worker( 'worker.js' );
//        worker.postMessage( '워커 실행' );    // 워커에 메시지를 보낸다.
//
//        // 메시지는 JSON구조로 직렬화 할 수 있는 값이면 사용할 수 있다. Object등
//        // worker.postMessage( { name : '302chanwoo' } );
//
//        // 워커로 부터 메시지를 수신한다.
//        worker.onmessage = function( e ) {
//          console.log('호출 페이지 - ', e.data );
//          output.innerHTML += e.data;
//        };
//      }
//    }
//
// worker 중지
function stopWorker() {

  if ( worker ) {
    worker.terminate();
    worker = null;
  }

}


function AIPlayer(color){
  Player.call(this, color);
}
AIPlayer.prototype = new Player();
AIPlayer.prototype.worker;

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
    if ( this.worker ) {
      stopWorker();
    }

    this.worker = new Worker('./js/worker.js');
    this.worker.postMessage(gomoku_board);

    this.worker.onmessage = function( e ) {
      var x = e.data.x;
      var y = e.data.y;
      if ( gomoku_board.isValidStone(x, y) ) {
        var stone = gomoku_board.getGomokuStone(x, y);
        gomoku_board.putStone(x, y);
        stopWorker();
      } else {
        this.worker.postMessage(gomoku_board);
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
