(function() {
  var player;
  var comp;
  var Node = function() {
  this.x = 0;
  this.y = 0;
};
  var rows = [new Node(), new Node(), new Node()];
  var cols = [new Node(), new Node(), new Node()];
  var diag = [new Node(), new Node()];
  var availableMoves = 9;
  document.getElementsByClassName("x")[0].addEventListener('click',function(){
    player = "X";
    comp = "O";
    $("#playAs").modal('hide');
    compMove();
  },false);
  document.getElementsByClassName("o")[0].addEventListener('click',function(){
    player = "O";
    comp = "X";
    $("#playAs").modal('hide');
    compMove();
  },false);
  var resetGame = function()
  {
    $("#GameOver").modal("show");
    window.setTimeout(function(){
      for(var i =0; i < 3; i++)
      {
        rows[i].x = 0;
        rows[i].y = 0;
      }
      for(var i =0; i < 3; i++)
      {
        cols[i].x = 0;
        cols[i].y = 0;
      }
      for(var i =0; i < 2; i++)
      {
        diag[i].x = 0;
        diag[i].y = 0;
      }
      for(var i = 1; i < 10; i++)
        document.getElementById(i).innerHTML = "&nbsp;";

      availableMoves = 9;
      compMove();
    },1500);
  }
  var compMove = function()
  {
    var notDone = true;
    while(notDone)
    {
      var row = (Math.floor(Math.random()*100))%3;
      var col = (Math.floor(Math.random()*100))%3;
      var loc = (row*3)+col+1;
      if(document.getElementById(loc).innerHTML == "&nbsp;")
      {
        document.getElementById(loc).innerHTML = comp;
        rows[row].y++;
        cols[col].y++;
        if(row == col)
        {
          if(row == 2)
          {
            diag[0].y++;
            diag[1].y++;
          }
          else diag[0].y++;
        }
        else if((row == 0 && col == 2 ) || (row == 2 && col == 0))
        diag[1].y++;

        if(rows[row].y == 3 || cols[col].y == 3 || diag[0].y == 3 || diag[1].y == 3)
          {
            resetGame();
          }
          availableMoves--;
          notDone = false;
      }
    }
  }
  var userClicked = function()
  {
    var elem = this.children[0];
    if(elem.innerHTML === "&nbsp;")
    {
      elem.innerHTML = player;
      availableMoves--;
      var loc = elem.id;
      var row = Math.floor((loc-1)/3);
      var col = (loc-1) - (row * 3);
      rows[row].x++;
      cols[col].x++;
      if(row == col)
      {
        if(row == 2)
        {
          diag[0].x++;
          diag[1].x++;
        }
        else diag[0].x++;
      }
      else if((row == 0 && col == 2 ) || (row == 2 && col == 0))
      diag[1].x++;

      if(rows[row].x == 3 || cols[col].x == 3 || diag[0].x == 3 || diag[1].x == 3)
        {
          resetGame();
        }
      compMove();
      if(availableMoves == 0)
      resetGame();
    }
    else {
      return;
    }
  }
  var elems = document.getElementsByClassName('square');
  for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click',userClicked,false);
  }
  $("#playAs").modal('show');
})();
