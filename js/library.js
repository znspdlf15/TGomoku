var TColor = { "black":1, "white":2, "red":3, "blue":4,
getColor:function(count){
  for ( var key in TColor ){
    if ( TColor[key] == count ){
      return key;
    }
  }
}
};

function arrayShuffle(d){
  for ( var c = d.length - 1; c > 0; c-- ){
    var b = Math.floor(Math.random() * ( c + 1 ));
    var a = d[c]; d[c] = d[b]; d[b] = a;
  }
  return d;
}
