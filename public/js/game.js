var velocity = parseInt($("div[you='1']").attr("velocity"));
var keyispressed = false;
var facing = "right";
$(document).ready(function(){
  var stagelength = parseInt($(".stage").css("width"));
  var chardiv = $("div[you='1']");
  var distance_from_left = parseInt(chardiv.css("left"));
  var distance_from_right = parseInt(chardiv.css("right"));

  $(document).keydown(function(key){
    distance_from_left = parseInt(chardiv.css("left"));
    distance_from_right = stagelength - distance_from_left - 80;
    console.log("key pressed: "+ key.which);
    console.log("stage width: " + stagelength);
    //move right
    if(key.which == 39)
    {
      keyispressed = true;
      velocity = parseInt($("div[you='1']").attr("velocity"));
      if(velocity < 50 && distance_from_right > 20)
      {
        velocity += 2;
        $("div[you='1']").attr("velocity", velocity);
      }
      chardiv.animate({left: "+="+velocity} , 2);
      chardiv.attr("facing", "right");

      console.log("distance from left : " + distance_from_left);
      console.log("distance from right : " + distance_from_right);
    }

    //move left
    if(key.which == 37)
    {
      keyispressed = true;
      velocity = parseInt($("div[you='1']").attr("velocity"));
      if(velocity > -50 && distance_from_left > 10)
      {
        velocity -= 2;
        $("div[you='1']").attr("velocity", velocity);
      }
      chardiv.animate({left: "+="+velocity} , 2);
      chardiv.attr("facing", "left");

      console.log("distance from left : " + distance_from_left);
      console.log("distance from right : " + distance_from_right);
    }

    //key.preventDefault()
  });

  //key is released
  $(document).keyup(function(key){
    //move right or move left
    if(key.which == 39 || key.which == 37)
    {
      keyispressed = false;
    }

    //move right
    if(key.which == 39)
    {
      facing = "right";
      chardiv.attr("facing", "right");
    }

    //move left
    if(key.which == 37)
    {
      facing = "left";
      chardiv.attr("facing", "left");
    }
  });

  setInterval(checkCharAnimation, 50);
  setInterval(stopCharMovement, 50);
});


function stopCharMovement()
{
  var chardiv = $("div[you='1']");
  var distance_from_left = parseInt(chardiv.css("left"));
  var distance_from_right = parseInt(chardiv.css("right"));

  if(distance_from_left < 10 || distance_from_right < 20)
  {
    velocity = 0;
    $("div[you='1']").attr("velocity", 0);
  }

  if(keyispressed == false)
  {

    if(velocity > 5)
    {
      velocity -= 10;
      $("div[you='1']").attr("velocity", velocity);
      if(velocity > 0)
      {
        $("div[you='1']").animate({left: "+="+velocity} , 1);
      }
    }
    else if(velocity < -5)
    {
      velocity += 10;
      $("div[you='1']").attr("velocity", velocity);
      if(velocity < 0)
      {
        $("div[you='1']").animate({left: "+="+velocity} , 1);
      }
    }
    else
    {
    velocity = 0;
    $("div[you='1']").attr("velocity", velocity);
    }
  }
}

function checkCharAnimation(){
  if(velocity > 0)
  {
    $("div[you='1']").css("background-image", "url('sonic/runright.gif')");
  }
  else if(velocity < 0)
  {
    $("div[you='1']").css("background-image", "url('sonic/runleft.gif')");
  }
  else
  {
    $("div[you='1']").css("background-image", "url('sonic/"+ facing +"/0.png')");
  }
}