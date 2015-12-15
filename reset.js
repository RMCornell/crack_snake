/**
 * Created by alchemy on 12/12/15.
 */

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

window.addEventListener('keyup', headPosition);

// Variables
// Snake Elements
var block;
var leftBlock;
var upBlock;
var rightBlock;
var downBlock;

var snake = [];
snake.push(new Block(0, 10, 10, 10));
snake.push(new Block(10, 10, 10, 10));

// Key Control Variables
var key;
var leftKey;
var upKey;
var rightKey;
var downKey;

var headLocationX = snake[0].x;
var headLocationY = snake[0].y;
var head = {x: headLocationX, y: headLocationY };

// Block Functions
function Block(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w || 10;
  this.h = h || 10;

  return this;
}

Block.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h);
  return this
};

Block.prototype.moveLeft = function() {
  this.x--;
  return this;
};

Block.prototype.moveUp = function() {
  this.y--;
  return this;
};

Block.prototype.moveRight = function() {
  this.x++;
  return this;
};

Block.prototype.moveDown = function() {
  this.y++;
  return this;
};



function left() {
    if(snake[0].x == 0) {
      snake.forEach(function(segment) {
        segment.draw();
      });
    } else {
      snake.forEach(function(segment) {
        segment.draw().moveLeft();
      })
    }
}

function up() {
    if(snake[0].y == 0){
      snake.forEach(function(segment) {
        segment.draw();
      });
    } else {
      snake.forEach(function(segment) {
        segment.draw().moveUp();
      });
    }
}

function right() {
  if(snake[0].x == canvas.width - snake[0].w) {
    snake.forEach(function(segment) {
      segment.draw();
    })
  } else {
    snake.forEach(function(segment) {
      segment.draw().moveRight();
    })
  }
}


function down() {
    if(snake[0].y == canvas.height - snake[0].h) {
      snake.forEach(function(segment) {
        segment.draw();
      });
    } else {
      snake.forEach(function(segment) {
        segment.draw().moveDown();
      });
    }
}

function headPosition(e) {
  key = e.keyCode;

  switch(key) {
    case 37:
      leftKey = 37;
      break;
    case 38:
      upKey = 38;
      break;
    case 39:
      rightKey = 39;
      break;
    case 40:
      downKey = 40;
      break;
  }
}

var direction;

function moveSnake(direction) {
  switch (direction) {
    case leftKey:
      console.log("Left", head);
      left();
      break;
    case upKey:
      console.log("Up", head);
      up();
      break;
    case rightKey:
      console.log("Right", head);
      right();
      break;
    case downKey:
      console.log("Down", head);
      down();
      break;
  }
}



window.requestAnimationFrame(function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37) {
      direction = leftKey;
    } else if(e.keyCode === 38) {
      direction = upKey;
    } else if(e.keyCode === 39) {
      direction = rightKey;
    } else if (e.keyCode === 40) {
      direction = downKey;
    }
  });

  moveSnake(direction);
  requestAnimationFrame(loop);
});









