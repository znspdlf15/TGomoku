var i = 0;

self.onmessage = function( e ) {
    loop();
};

function loop() {
  var x = parseInt(Math.random() * 19);
  var y = parseInt(Math.random() * 19);

  self.postMessage( { x: x, y: y } );
}
