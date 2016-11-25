(function() {
  var sessionLength = 1;
  var intervalLength = 25;
  var secondsLeft = sessionLength * 60;
  var start = false;
  var session = true;
  var currentSession = "session";
  var updateBreak = function(val)
  {
    if(!start)
    {
        intervalLength += val;
        if(intervalLength<1)
        intervalLength = 1;
        document.getElementById("breakLength").innerHTML = intervalLength;
        secondsLeft = session ? secondsLeft : intervalLength*60;
    }
    updateDisp();
  }
  var updateSession = function(val)
  {
    if(!start)
    {
      sessionLength += val;
      if(sessionLength<1)
      sessionLength = 1;
      document.getElementById("sessionLength").innerHTML = sessionLength;
      secondsLeft = session ? sessionLength*60 : secondsLeft;
    }
    updateDisp();
  }
  var updateText = function()
  {
    var msg = session ? "Session" : "Break";
    document.getElementById("current").innerHTML = msg;
  }
  var updateDisp = function()
  {
    num = Number(secondsLeft);
    var h = Math.floor(num / 3600);
    var m = Math.floor(num % 3600 / 60);
    var s = Math.floor(num % 3600 % 60);
    var toPrint = (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s)
    document.getElementById("time").innerHTML = toPrint;
    var t = session ? sessionLength*60 : intervalLength*60
    var percent = Math.abs((secondsLeft/t)*100 - 100);
    document.getElementById("fill").style.height = percent+"%";
  }

  var NotifyUser = function(msg)
  {
    console.log("inside notify");
    if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
    var notification = new Notification(msg);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(msg);
      }
    });
  }
  }
  var clock = function()
  {
    start = !start;
    console.log(start);
    var timer;
    timer = setInterval(function(){
      if(start)
      {
        secondsLeft--;
        if(secondsLeft == 0)
        {
          var msg = session ? "Session Ended! Enjoy your break." : "Break Ended! Lets start working.";
          NotifyUser(msg);
          session = !session;
          secondsLeft = session ? sessionLength*60 : intervalLength*60;
          updateText();
         }
         updateDisp();
      }
      else {
        {
          window.clearInterval(timer);
        }
      }
     },1000);
  }
  updateDisp();
  updateText();
  updateBreak(0);
  updateSession(0);
  document.getElementById("start").addEventListener('click',clock,false);
  document.getElementById("incrementBreak").addEventListener('click',function(){updateBreak(1);},false);
  document.getElementById("decrementBreak").addEventListener('click',function(){updateBreak(-1);},false);
  document.getElementById("incrementSession").addEventListener('click',function(){updateSession(1);},false);
  document.getElementById("decrementSession").addEventListener('click',function(){updateSession(-1);},false);
  Notification.requestPermission(function (permission) {
  });
})();
