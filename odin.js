/**
 * Created by alchemy on 12/9/15.
 */

// Get Canvas Element and Set Context
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// Add EventListner for Keyboard Commandsfunction keyDownMovement() {
window.addEventListener('keyup', snakeMovement);

var snake = [];
snake.push(new Block(50, 50, 10, 10));
snake.push(new Block(60, 50, 10, 10));
snake.push(new Block(70, 50, 10, 10));
snake.push(new Block(80, 50, 10, 10));
snake.push(new Block(90, 50, 10, 10));
snake.push(new Block(100, 50, 10, 10));
snake.push(new Block(110, 50, 10, 10));

// Key Control Variables
var leftKey;
var upKey;
var rightKey;
var downKey;
var key;
this.gridSize = 10;

// EventListner Firing Actions
function snakeMovement(e) {
  key = e.keyCode;
  switch(key) {
    case 37:
      leftKey = 37;
      console.log("Left");
      break;
    case 38:
      upKey = 38;
      console.log('Up');
      break;
    case 39:
      rightKey = 39;
      console.log("Right");
      break;
    case 40:
      downKey = 40;
      console.log("Down");
      break;
  }
  return key;
}

// Define Board Boundries



// Food Definitions and Prototypes
// Define Food Object
function Food(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

// Food Draw Prototype
Food.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h);
};

// Food object placement
var food = new Food(70, 100, 10, 10);

function placeFood() {
  food.draw();
}

// Snake Definitions and Prototypes
// Define Snake

// Target Collision Detection
function targetCollision(segment) {
  snakeHeadx = snake[0].x;
  if(snakeHeadX === food.x) {
    segment.draw();
  }
}

// Left Collision Detection
function leftCollision(segment) {
  var leftBoundry = 0;
  if(snake[0].x === leftBoundry) {
    segment.draw()
  } else {
    segment.draw().moveLeft();
  }
}

// Top Collision Detection
function topCollision(segment) {
  var topBoundry = 0;
  if(snake[0].y === topBoundry) {
    segment.draw()
  } else {
    segment.draw().moveUp();
  }
}

// Right Collision Detection
function rightCollision(segment) {
  var rightBoundry = canvas.width - snake[0].w;
  if(snake[0].x === rightBoundry) {
    segment.draw();
  } else {
    segment.draw().moveRight();
  }
}

// Bottom Collision Detection
function bottomCollision(segment) {
  var bottomBoundry = canvas.height - snake[0].h;
  if(snake[0].y === bottomBoundry) {
    segment.draw()
  } else {
    segment.draw().moveDown();
  }
}

// Snake Movements
function moveSnake() {
  //requestAnimationFrame(function loop() {
  //  context.clearRect(0, 0, canvas.width, canvas.height);

    var newHeadLocationX;
    var newHeadLocationY;

     //Draw Snake

    //snake.forEach(function(segment) {
    //  segment.draw()
    //})

    snake.forEach(function(segment) {
      switch(key) {
        case leftKey:

            newHeadLocationX = snake[0].x - gridSize;
            newHeadLocationY = snake[0].y;

            snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
            snake.pop();

            segment.draw();

            leftCollision(segment);
          break;

        case upKey:
          newHeadLocationY = snake[0].y - gridSize;
          newHeadLocationX = snake[0].x;

          snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
          snake.pop();

          segment.draw();

          topCollision(segment);
          break;

        case rightKey:
            context.clearRect(0, 0, canvas.width, canvas.height);
            newHeadLocationX = snake[0].x + gridSize;
            newHeadLocationY = snake[0].y;

            snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
            snake.pop();

            segment.draw();

            rightCollision(segment);

          break;

        case downKey:
          newHeadLocationY = snake[0].y + gridSize;
          newHeadLocationX = snake[0].x;

          snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
          snake.pop();

          segment.draw();

          var bottomBoundry = canvas.height - snake[0].h;
          if(snake[0].y === bottomBoundry) {
            segment.draw();
          break;
        }
      }
    //  if(segment.x === food.x + segment.w) {
    //    console.log('Target hit!');
    //  }
    });


    //switch(key) {
    //  case leftKey:
    //    newHeadLocationX = snake[0].x - gridSize;
    //    newHeadLocationY = snake[0].y;
    //
    //    snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
    //    snake.pop();
    //
    //    snake.forEach(function(segment) {
    //      segment.draw();
    //
    //      var leftBoundry = 0;
    //      if(snake[0].x === leftBoundry) {
    //        segment.draw()
    //      }
    //
    //    });
    //
    //    break;
    //
    //  case upKey:
    //    newHeadLocationY = snake[0].y - gridSize;
    //    newHeadLocationX = snake[0].x;
    //
    //    snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
    //    snake.pop();
    //
    //    snake.forEach(function(segment) {
    //      segment.draw()
    //
    //      var topBoundry = 0;
    //      if(snake[0].y === topBoundry) {
    //        segment.draw()
    //      } else {
    //        segment.draw().moveUp();
    //      }
    //
    //
    //    });
    //    break;
    //
    //  case rightKey:
    //    newHeadLocationX = snake[0].x + gridSize;
    //    newHeadLocationY = snake[0].y;
    //
    //    snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
    //    snake.pop();
    //
    //    snake.forEach(function(segment) {
    //      segment.draw();
    //
    //      var rightBoundry = canvas.width - snake[0].w;
    //      if(snake[0].x === rightBoundry) {
    //        segment.draw();
    //      } else {
    //        segment.draw().moveRight();
    //      }
    //
    //    });
    //    break;
    //
    //  case downKey:
    //    newHeadLocationY = snake[0].y + gridSize;
    //    newHeadLocationX = snake[0].x;
    //
    //    snake.unshift(new Block(newHeadLocationX, newHeadLocationY, gridSize, gridSize));
    //    snake.pop();
    //    snake.forEach(function(segment) {
    //      segment.draw();
    //
    //      var bottomBoundry = canvas.height - snake[0].h;
    //      if(snake[0].y === bottomBoundry) {
    //        segment.draw()
    //      } else {
    //        segment.draw().moveDown();
    //      }
    //
    //    });
    //    break;
    //
    //
    //
    //
    //}





     //With Self




     //With Food




    //requestAnimationFrame(loop);
    //placeFood();

}



//var newSnake = [];
//newSnake.push(new Block(50,50));
//newSnake.push(new Block(60,50));
//newSnake.push(new Block(70,50));
//
//var newSnakeHead = newSnake.splice(0, 1);
//function moveSnakeHead(snakeArray) {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//
//    newSnakeHead[0].draw();
//
//    // Draw rest of snake
//    snakeArray.forEach(function(segment) {
//      segment.draw();
//    });
//
//    moveHead(newSnakeHead);
//    movebody(snakeArray);
//    // Draw new Snake Head
//
//
//
//    requestAnimationFrame(loop);
//  })
//}
//
//// Move Head Function
//function moveHead(newSnakeHead) {
//  newSnakeHead.forEach(function(head) {
//    switch (key) {
//      case leftKey:
//        head.draw().moveLeft();
//        break;
//
//      case upKey:
//        head.draw().moveUp();
//        break;
//
//      case rightKey:
//        head.draw().moveRight();
//        break;
//
//      case downKey:
//        head.draw().moveDown();
//        break;
//    }
//  });
//}
//
//// Move Body Function
//function movebody(snakeArray) {
//  snakeArray.forEach(function(segment) {
//    switch (key) {
//      case leftKey:
//        segment.draw().moveBodyLeft();
//        break;
//
//      case upKey:
//        segment.draw().moveBodyUp();
//        break;
//
//      case rightKey:
//        segment.draw().moveBodyRight();
//        break;
//
//      case downKey:
//        segment.draw().moveBodyDown();
//        break;
//    }
//  });
//}

// Define single snake segment
function Block(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w || 10;
  this.h = h || 10
}

// Block Prototype Methods
// Draw Block
Block.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h);
  return this;
};

Block.prototype.drawBody = function() {
  this.x = newSnakeHead.x;
  this.y = newSnakeHead.y;
  context.fillRect(this.x, this.y, this.w, this.h);
  return this
};

// Move Block Up
Block.prototype.moveUp = function() {
  this.y--;
  return this;
};

// Move Body Up
Block.prototype.moveBodyUp = function() {
  this.y = newSnakeHead[0].y;
  this.y--;
  return this;
}

// Move Block Down
Block.prototype.moveDown = function() {
  this.y++;
  return this
};

// Move Body Down
Block.prototype.moveBodyDown = function() {
  this.y = newSnakeHead[0].y;
  this.y++;
  return this;
}

// Move Block Right
Block.prototype.moveRight = function() {
  this.x++;
  return this;
};

// Move Body Right
Block.prototype.moveBodyRight = function() {
  this.x = newSnakeHead[0].x;
  this.x++;
  return this
};

// Move Block Left
Block.prototype.moveLeft = function() {
  this.x--;
  return this;
};

// Move Body Left
Block.prototype.moveBodyLeft = function() {
  this.x =
  this.x--;
  return this
};

window.requestAnimationFrame(function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37) {
      direction = leftKey;
    } else if(e.keyCode === 38) {
      direction = upKey;
    } else if(e.keyCode === 39) {
      direction = rightKey;
    } else if(e.keyCode === 40) {
      direction = downKey;
    }
  });

  moveSnake();
  requestAnimationFrame(loop);
});


