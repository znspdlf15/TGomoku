var i = 0;

self.onmessage = function( e ) {
    loop();
};

function loop() {
  var x = Math.random() * 19;
  var y = Math.random() * 19;

  return { x: x, y: y };
}
