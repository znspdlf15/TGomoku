var Drawable = {
  "width" : 0,
  "height" : 0,
  draw:function(target){
    var ctx = canvas.getContext("2d");
    ctx.rect(0, 0, width, height);
    ctx.stroke();
  }
};

var ContainerWindow = {
  draw:function(target){
    var ctx = canvas.getContext("2d");
    ctx.rect(0, 0, 800, 800);
    ctx.stroke();
  }
};

var GomokuBoard = {
  draw:function(target){
    var ctx = canvas.getContext("2d");
    var startX = 50, startY = 50;
    var canvWidth = 700, canvHeight = 700;

    var i;
    for ( i = 0; i < 19; i++ ){
      ctx.beginPath();
      ctx.moveTo(startX + canvWidth/18 * i, startY);
      ctx.lineTo(startX + canvWidth/18 * i, startY + canvHeight);
      ctx.stroke();
    }
    for ( i = 0; i < 19; i++ ){
      ctx.beginPath();
      ctx.moveTo(startX, startY + canvHeight/18 * i);
      ctx.lineTo(startX + canvWidth, startY + canvHeight/18 * i);
      ctx.stroke();
    }

    var point = new Array(new Array(9), new Array(2));
    point = [[4, 4], [4, 10], [4, 16], [10, 4], [10, 10], [10, 16], [16, 4], [16, 10], [16, 16]];

    ctx.lineWidth = 5;
    for ( i = 0; i < point.length; i++ ){
      var x = point[i][0] - 1;
      var y = point[i][1] - 1;
      ctx.beginPath();
      ctx.arc(startX + canvWidth/18 * x, startY + canvHeight/18 * y, 1, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
};

// ContainerWindow.prototype = new Drawable;
