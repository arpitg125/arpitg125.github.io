 $(document).ready(function()
                 {
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  
  var food;
  var score;
  var level;
  var snake_array;
  var cw = 20;
  var d;
  
  function initial()
  {
    d = "right";
    score = 0;
    level = 1;
    create_snake();
    create_food();
   
    
    if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 500);

  }
  initial();
  
   function create_snake()
  {
    var length = 3;
    snake_array = [];
    
    for(var i = length-1; i>=0; i--)
      {
        snake_array.push({x:i, y:0});
      }
  }
  
    function create_food()
  {
    food = {
      x: Math.round(Math.random()*(w-cw)/cw),
      y: Math.round(Math.random()*(h-cw)/cw),
    };
  }
  
  function paint()
  {
     ctx.fillStyle = "white";
     ctx.fillRect(0, 0, w, h);
     ctx.strokeStyle = "black";
     ctx.strokeRect(0, 0, w, h);
    
    var head_x = snake_array[0].x;
    var head_y = snake_array[0].y;
    
    if(d == "right") head_x++;
    else if(d == "left") head_x--;
    else if(d == "up") head_y++;
    else if(d == "down") head_y--;
    
    if(head_x == -1 || head_x == w/cw || head_y == -1 || head_y == h/cw || crash(head_x, head_y, snake_array))
      {
        initial();
        return;
      }
    
    if(head_x == food.x && head_y == food.y)
      {
        var tail = {x: head_x, y: head_y}
        score++;
        create_food();
      }
    else
      {
        var tail = snake_array.pop();
        tail.x = head_x; tail.y = head_y;
      }
      
    snake_array.unshift(tail);
    
    for(var i = 0; i < snake_array.length; i++)
      {
        var c = snake_array[i];
        paint_cell(c.x,c.y,"lightblue");
      }
    
    paint_cell(food.x,food.y, "lightgreen");
    
    var score_text = "Score: " + score;
    var level_text = "Level: " + level;
    ctx.fillText(score_text,5,h-5);
    ctx.fillText(level_text,60,h-5);
  }
  
  function paint_cell(x,y,color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*cw,y*cw,cw,cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cw,y*cw,cw,cw);
  }
  
  function crash(x,y,array)
  {
    for(var i = 0; i < array.length; i++)
      {
        if(array[i].x == x && array[i].y == y)
          return true;
      }
    return false;
  }
  
  $(document).keydown(function(e)
                     {
var key = e.which;
              
       if(key == "37" && d != "right") d = "left";
          else if(key == "38" && d != "up") d = "down";
       else if(key == "39" && d != "left") d = "right";
        else if(key == "40" && d != "down") d = "up";
  }
                      
                     )
}                    
            )