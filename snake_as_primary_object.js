/**
 * Created by alchemy on 12/11/15.
 */

// Canvas Element and Setting Context
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var requestID; // Animate Canvas Request ID

// Animate Frame for Game Play
requestID = requestAnimationFrame(function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //directionChange();
  moveSnake();
  placeFood();
  requestAnimationFrame(loop);
});

requestAnimationFrame(moveSnake);

// Define Snake Body as an empty Array
function Snake() {
  this.body = [];
  this.head = this.body[0];
  return this;
}

function Body(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w || 10;
  this.h = h || 10;
  return this;
}

function Food(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w || 10;
  this.h = h || 10;
  return this;
}

Food.prototype.position = function() {
  this.x = Math.floor((Math.random() * 560 - 20) + 20);
  this.y = Math.floor((Math.random() * 260 - 20) + 20);
  this.w = 10;
  this.h = 10;
  return this;
};

Food.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h)
  return this;
};

// Define Function Snake will perform (movements, collision detection)
// Add Snake Segement to Array
Body.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h);
  return this
};

Snake.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h);
  return this
};

Food.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h)
  return this
};

// Add Body Segment to Snake
Snake.prototype.addSegment = function() {
  segment = new Body(10, 10);
  this.body.push(segment);
  return this;
};

// Move Snake to Left
Snake.prototype.moveLeft = function() {
  this.body.forEach(function(segment) {
    segment.x--;
    context.fillRect(segment.x, segment.y, 10, 10);
  });
  return this;
};

// Change Direction Left
Snake.prototype.changeDirectionLeft = function() {
  this.x = this.body[0].x - 10;
  this.y = this.body[0].y;

    this.body.unshift(new Body(this.x, this.y));
    this.body.pop();

  return this;
};

// Move Snake Up
Snake.prototype.moveUp = function() {
  this.body.forEach(function(segment) {
    segment.y--;
    context.fillRect(segment.x, segment.y, 10, 10);
  });
  return this;
};

// Change Direction Up
Snake.prototype.changeDirectionUp = function() {
  this.x = this.body[0].x;
  this.y = this.body[0].y -10;

  this.body.unshift(new Body(this.x, this.y));
  this.body.pop();



  return this;
};

// Move Snake To Right
Snake.prototype.moveRight = function() {
  this.body.forEach(function(segment) {
    segment.x++;
    context.fillRect(segment.x, segment.y, 10, 10);
  });
  return this
};

// Change Direction Right
Snake.prototype.changeDirectionRight = function() {
  this.x = this.body[0].x + 10;
  this.y = this.body[0].y;

  this.body.unshift(new Body(this.x, this.y));
  this.body.pop();

  return this;
}

// Move Snake Down
Snake.prototype.moveDown = function() {
  this.body.forEach(function(segment) {
    segment.y++;
    context.fillRect(segment.x, segment.y, 10, 10)
  });

  return this
};

// Change Direction Down
Snake.prototype.changeDirectionDown = function() {
  this.x = this.body[0].x;
  this.y = this.body[0].y + 10;


  this.body.unshift(new Body(this.x, this.y));
  this.body.pop();

  return this;
};

// Game Play Functions
function left() {
  if(snake.body[0].x == 0){
    snake.body.forEach(function(segment) {
      segment.draw();
      console.log("Left Wall Hit");
    })
  } else {
    snake.moveLeft();
  }
}

function up() {
  if(snake.body[0].y == 0) {
    snake.body.forEach(function(segment) {
      segment.draw();
      console.log("Top Wall Hit");
    })
  } else {
    snake.moveUp();
  }
}

function right() {
  if(snake.body[0].x == canvas.width - snake.body[0].w) {
    snake.body.forEach(function(segment) {
      segment.draw();
      console.log("Right Wall Hit");
    })
  } else {
    snake.moveRight();
  }
}

function down() {
  if(snake.body[0].y == canvas.height - snake.body[0].h) {
    snake.body.forEach(function(segment) {
      segment.draw();
      console.log("Bottom Wall Hit");
    })
  } else {
    snake.moveDown();
  }
}

var direction;

// Primary Snake Movement
function moveSnake() {
  switch(direction) {
    case leftKey:
      left();
      break;
    case upKey:
      up();
      break;
    case rightKey:
      right();
      break;
    case downKey:
      down();
      break;
  }
}

var food;

function placeFood() {
  food = new Food(50, 50);
  food.position();
}



// Snake Variables
var snake = new Snake();
snake.body.push(new Body(10,10));
snake.body.push(new Body(20, 10));
snake.body.push(new Body(30, 10));
snake.body.push(new Body(40, 10));
snake.body.push(new Body(50, 10));

food = new Food(50, 50);
food.draw();

// Key Control Variables
var key;
var leftKey;
var upKey;
var rightKey;
var downKey;

// Snake Head Tracking Variables
var position;
var newHeadLocationX;
var newHeadLocationY;

// Snake Head Positioning Function
document.addEventListener('keydown', function(e) {
  if(e.keyCode === 37) {
    direction = leftKey;
    snake.changeDirectionLeft();
  } else if(e.keyCode === 38) {
    direction = upKey;
    snake.changeDirectionUp();
  } else if(e.keyCode === 39) {
    direction = rightKey;
    snake.changeDirectionRight();
  } else if(e.keyCode === 40) {
    direction = downKey;
    snake.changeDirectionDown();
  }
});

function directionChange() {
  switch(direction) {
    case 37:
      snake.changeDirectionLeft();
      break;
    case 38:
      snake.changeDirectionUp();
      break;
    case 39:
      snake.changeDirectionRight();
      break;
    case 40:
      snake.changeDirectionDown();
      break;
  }
}

document.addEventListener('keyup', headPosition);

function headPosition(e) {
  newHeadLocationX = snake.body[0].x;
  newHeadLocationY = snake.body[0].y;

  position = {x: newHeadLocationX, y: newHeadLocationY};

  key = e.keyCode;

  switch(key) {
    case 37:
      leftKey = 37;
      console.log("LEFT", position);
      break;
    case 38:
      upKey = 38;
      console.log("UP", position);
      break;
    case 39:
      rightKey = 39;
      console.log("RIGHT", position);
      break;
    case 40:
      downKey = 40;
      console.log("DOWN", position);
      break;
  }
}
