(function() {
  var Game = function() {
    this.on = false;
    this.start = false;
    this.strict = false;
    this.audio = [new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    ];
    this.userTurn = false;
    this.sequenceSoFar = [];
    this.lost = false;
    this.count = 0;
    this.userCount = 0;
  }
  var game = new Game();

  var reset = function() {
    game.start = true;
    game.strict = false;
    game.userTurn = false;
    game.sequenceSoFar = [];
    game.lost = false;
    game.count = 0;
    game.userCount = 0;
    document.getElementById("strict").classList.remove("strict");
    document.getElementById("count").innerHTML = "00";
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    startGame();
  }

  var addClass = function(time, elm, cls, callback) {
    window.setTimeout(function() {
      var sid = elm.id;
      sid = Number(sid);
      game.audio[sid - 1].play();
      elm.classList.add(cls);
      callback(elm, cls, time);
    }, time)
  }

  var removeClass = function(elm, cls) {
    window.setTimeout(function() {
      elm.classList.remove(cls);
    }, 800)
  }

  var runSequence = function(seq) {
    for (var i = 0; i < game.count; i++) {
      var id = Number(seq[i].id);
      var elm = seq[i];
      var cls;
      switch (id) {
        case 1:
          cls = "clicked-red";
          break;
        case 2:
          cls = "clicked-blue";
          break;
        case 3:
          cls = "clicked-yellow";
          break;
        case 4:
          cls = "clicked-green";
          break;
      }

      addClass((i * 1500), elm, cls, removeClass);
    }
  }

  var startGame = function() {
    window.setTimeout(function() {
      if (game.start) {
        if (game.lost && game.strict)
          reset();
        else if (game.lost == true && game.strict == false) {
          runSequence(game.sequenceSoFar);
          game.userCount = 0;
          game.userTurn = true;
          game.lost = false;
        } else if (!game.lost) {
          var id = ((Math.floor(Math.random() * 100)) % 4) + 1;
          id += "";
          game.sequenceSoFar.push(document.getElementById(id));
          game.count++;
          runSequence(game.sequenceSoFar);
          game.userCount = 0;
          game.userTurn = true;
        }
      }
    }, 1000);
  }

  document.getElementsByTagName("input")[0].addEventListener('click',
    function() {
      game.on = !game.on;
      var txt = game.on ? "OFF" : "ON";
      window.setTimeout(function() {
        document.getElementById("status").innerHTML = txt;
      }, 600);
      if (!game.on) reset();
    }, false);

  document.getElementById("start").addEventListener('click', function() {
    if (game.on) {
      game.start = true;
      var count = 1;
      var timer = window.setInterval(function() {
        console.log(count);
        if (count % 2 == 0) {
          document.getElementById("count").innerHTML = "| |";
        } else {
          document.getElementById("count").innerHTML = "- -";
        }
        count++;
        if (count == 5) {
          console.log(count);
          document.getElementById("count").innerHTML = "00";
          window.clearInterval(timer);
          startGame();
        }
      }, 1000);
    } else {
      reset();
    }
  }, false);

  var squares = document.getElementsByClassName('square');
  for (var i = 0; i < 4; i++) {
    squares[i].addEventListener('click', function() {
      if (game.userTurn) {
        var sid = this.id;
        sid = Number(sid);
        game.audio[sid - 1].play();
        if (game.sequenceSoFar[game.userCount] == this)
          game.userCount++;
        else {
          game.lost = true;
        }
        if (game.lost) {
          game.userTurn = false;
          game.userCount = 0;
          document.getElementById("count").innerHTML = "- -"
          document.getElementById("count").innerHTML = "! !";
          window.setTimeout(function() {
            if (game.count < 9)
              document.getElementById("count").innerHTML = "0" + game.count;
            else {
              document.getElementById("count").innerHTML = game.count;
            }
          }, 500);
          startGame();
        }
        if (game.userCount == game.count) {
          game.userTurn = false;
          game.userCount = 0;
          if (game.count < 9)
            document.getElementById("count").innerHTML = "0" + game.count;
          else {
            document.getElementById("count").innerHTML = game.count;
          }
          startGame();
        }
      }
    });
  }

  document.getElementById("strict").addEventListener('click', function() {
    game.strict = !game.strict;
    if (game.strict) this.classList.add("strict");
    else this.classList.remove("strict");
  }, false);
})();
