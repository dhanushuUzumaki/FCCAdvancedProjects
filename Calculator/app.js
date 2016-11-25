(function() {
  var exp = "";
  elems = document.getElementsByClassName('btn');
  clickEvent = function()
  {
    switch(this.value)
    {
      case 'AC' : exp = "";
                  break;
      case 'CE' : exp = exp.slice(0,-1);
                  break;
      case '=' : if(exp !== "")
                  exp = ""+eval(exp);
                 break;
      default : exp += this.value;
    }
    document.getElementById('display').value = exp;
  }
  for(var i = 0; i < elems.length; i++)
  {
    elems[i].addEventListener('click',clickEvent);
  }
})();
