var i = 0;

self.onmessage = function( e ) {
    postAnswer();
};

function postAnswer() {
  var x = parseInt(Math.random() * 19);
  var y = parseInt(Math.random() * 19);

  setTimeout( function() {
      self.postMessage( { x: x, y: y } );
  }, 1000 );
}
