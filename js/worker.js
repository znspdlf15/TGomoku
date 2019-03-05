var i = 0;

self.onmessage = function( e ) {
    loop();
};

function loop() {

  postMessage( ++i );

  setTimeout( function() {
      loop();
  }, 1000 );

}
