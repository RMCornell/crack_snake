// Define Canvas Components

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// Game Variables
var width = canvas.width;
var height = canvas.height;
var cellSize = 10;
var direction;
var target;
var score;

// Snake Array
// TODO make a parameter of Snake Object
var snake;

function init()
{
  direction = "right";
  createSnake();
  createTarget();
  score = 0;

  //Lets move the snake now using a timer which will trigger the paint function
  //every 60ms
  if(typeof game_loop != "undefined") clearInterval(game_loop);
  game_loop = setInterval(drawSnake, 70);
}

init();



// TODO Extract into Snake prototype Method
function createSnake() {
  var length = 1;
  snake = [];

  for(var i = length - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 })
  }
}

function createTarget() {
  target = {
    x: Math.round(Math.random() * (width - cellSize) / cellSize),
    y: Math.round(Math.random() * (height - cellSize) / cellSize)
  }
}

// TODO Extract into Snake Prototype Method

// Snake Movement
function drawSnake() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = 'black';
  context.strokeRect(0, 0, width, height);

  var headX = snake[0].x;
  var headY = snake[0].y;

  if(direction == 'right') {
    headX++;
  } else if(direction == 'left') {
    headX--;
  } else if(direction == 'up') {
    headY--;
  } else if(direction == 'down') {
    headY++;
  }

  if(headX == -1 || headX == width/cellSize || headY == -1 || headY == height/cellSize || collisionCheck(headX, headY, snake)) {
    init();
    return;
  }

  //function left() {
  //  if(snake[0].x == 0) {
  //    snake.forEach(function(segment) {
  //      segment.draw();
  //    });
  //  } else {
  //    snake.forEach(function(segment) {
  //      segment.draw().moveLeft();
  //    })
  //  }
  //}
  //
  //function up() {
  //  if(snake[0].y == 0){
  //    snake.forEach(function(segment) {
  //      segment.draw();
  //    });
  //  } else {
  //    snake.forEach(function(segment) {
  //      segment.draw().moveUp();
  //    });
  //  }
  //}
  //
  //function right() {
  //  if(snake[0].x == canvas.width - snake[0].w) {
  //    snake.forEach(function(segment) {
  //      segment.draw();
  //    })
  //  } else {
  //    snake.forEach(function(segment) {
  //      segment.draw().moveRight();
  //    })
  //  }
  //}
  //
  //
  //function down() {
  //  if(snake[0].y == canvas.height - snake[0].h) {
  //    snake.forEach(function(segment) {
  //      segment.draw();
  //    });
  //  } else {
  //    snake.forEach(function(segment) {
  //      segment.draw().moveDown();
  //    });
  //  }
  //}


  if(headX == target.x && headY == target.y) {
    var snakeBody = { x: headX, y: headY };
    score = score + 100;
    createTarget();
  } else {
    var snakeBody = snake.pop();
    snakeBody.x = headX;
    snakeBody.y = headY;
  }

  snake.unshift(snakeBody);

  for(var i = 0; i < snake.length; i++) {
    var c = snake[i];

    drawCell(c.x, c.y);
  }

  // Draw New Target
  drawCell(target.x, target.y);

  var scoreText = "Score: " + score;
  context.fillText(scoreText, 5, height-5);

  function drawCell(x, y) {
    context.fillStyle = 'white';
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    context.strokeStyle = 'black';
    context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }

  //Collision Check with Self
  function collisionCheck(x, y, array) {
    for(var i = 0; i < array.length; i++)
    {
      if(array[i].x == x && array[i].y == y)
        return true;
    }
    return false;
  }

  // KeyBoard Controls
  //function headPosition(e) {
  //  key = e.keyCode;
  //
  //  switch(key) {
  //    case 37:
  //      leftKey = 37;
  //      break;
  //    case 38:
  //      upKey = 38;
  //      break;
  //    case 39:
  //      rightKey = 39;
  //      break;
  //    case 40:
  //      downKey = 40;
  //      break;
  //  }
  //}
  //
  //var direction;
  //
  //function moveSnake(direction) {
  //  switch (direction) {
  //    case leftKey:
  //      console.log("Left", head);
  //      left();
  //      break;
  //    case upKey:
  //      console.log("Up", head);
  //      up();
  //      break;
  //    case rightKey:
  //      console.log("Right", head);
  //      right();
  //      break;
  //    case downKey:
  //      console.log("Down", head);
  //      down();
  //      break;
  //  }
  //}
  //

  document.addEventListener('keydown', function(e) {
    var key = e.keyCode;

    if(key == 37 && direction != 'right') {
      direction = 'left';
      // Debugging Verify Head Locaiton
      console.log({ x: snake[0].x, y: snake[0].y });
    } else if (key == 38 && direction != 'down') {
      direction = "up";
      // Debugging Verify Head Locaiton
      console.log({ x: snake[0].x, y: snake[0].y });
    } else if(key == 39 && direction != 'left') {
      direction = 'right';
      // Debugging Verify Head Locaiton
      console.log({ x: snake[0].x, y: snake[0].y });
    } else if(key == 40 && direction != 'up') {
      direction = 'down';
      // Debugging Verify Head Locaiton
      console.log({ x: snake[0].x, y: snake[0].y });
    }
  })





  //
  //
  //window.requestAnimationFrame(function loop() {
  //  context.clearRect(0, 0, canvas.width, canvas.height);
  //
  //  document.addEventListener('keydown', function(e) {
  //    if(e.keyCode === 37) {
  //      direction = leftKey;
  //    } else if(e.keyCode === 38) {
  //      direction = upKey;
  //    } else if(e.keyCode === 39) {
  //      direction = rightKey;
  //    } else if (e.keyCode === 40) {
  //      direction = downKey;
  //    }
  //  });
  //
  //  moveSnake(direction);
  //  requestAnimationFrame(loop);
  //});



};
