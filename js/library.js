var TColor = { "black":1, "white":2, "red":3, "blue":4,
getColor:function(count){
  for ( var key in TColor ){
    if ( TColor[key] == count ){
      return key;
    }
  }
}
};
