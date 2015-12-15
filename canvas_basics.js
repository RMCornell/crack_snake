/**
 * Created by alchemy on 12/7/15.
 */

//var canvas = document.getElementById('game');
//var context = canvas.getContext('2d');

//canvas.addEventListener("click", function(e) {
//  var click = getClickPosition(e);
//  snake.push(new Block(click.x, click.y, 10, 10));
//});

//var cellWidth = 10;

// Canvas Boundries
    // Define these later


// Snake
//var snake = [];

//snake.push(new Block(50, 50, 10, 10));
//snake.push(new Block(60, 50, 10, 10));
//snake.push(new Block(70, 50, 10, 10));

// SnakeHead
//var snakeHead = { x: snake[0].x, y: snake[0].y, w: snake[0].w, h: snake[0].h };

//window.addEventListener("keydown", changeDirection, false);
//
//// Keyboard Directional Controls
//function changeDirection(e) {
//  switch(e.keyCode) {
//    case 37:
//      console.log("Left Key Pressed");
//      blockLeft();
//      break;
//
//    case 38:
//      console.log("Up Key Pressed");
//      blockUp();
//      break;
//
//    case 39:
//      console.log("Right Key Pressed");
//      blockRight();
//      break;
//
//    case 40:
//      console.log("Down Key Pressed");
//      newDown();
//      break;
//  }
//}
//
//// Define Single Block
//function Block(x, y, w, h) {
//  this.x = x;
//  this.y = y;
//  this.w = w;
//  this.h = h
//}

// Block Prototype Methods
//Draw Block
//Block.prototype.draw = function() {
//  context.fillRect(this.x, this.y, this.w, this.h);
//  return this
//};

// Move Block Up
//Block.prototype.moveUp = function() {
//  this.y--;
//  return this;
//};

// Change Direction Down
//Block.prototype.changeDirectionDown = function() {
//  this.y = this.y + this.h;
//  return this;
//};
//
//function newDown() {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//
//    snake.forEach(function(block) {
//      block.draw().changeDirectionDown();
//    });
//    requestAnimationFrame(loop);
//  });
//
//
//
//
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    var lowerStopPoint = canvas.height - snakeHead.h;
//
//    snake.forEach(function(block) {
//      if(block.y !== lowerStopPoint) {
//        block.changeDirectionDown().draw().moveDown(block.x, block.y).draw();
//      } else {
//        block.y = lowerStopPoint;
//        block.draw();
//      }
//    });
//    requestAnimationFrame(loop);
//  });
//}



// Move Block Down
//Block.prototype.moveDown = function(x, y) {
//  this.x = x;
//  this.y++;
//  return this;
//};

// Move Block Right
//Block.prototype.moveRight = function() {
//  this.x++;
//  return this;
//};

// Move Block Left
//Block.prototype.moveLeft = function() {
//  this.x--;
//  return this;
//};


// Block Movement Functions
// Block Up Function
//function blockUp() {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    snake.forEach(function(block) {
//      var topStopPoint = block.h - block.h;
//
//      if(block.y !== topStopPoint) {
//        block.draw().moveUp();
//      } else {
//        block.draw();
//      }
//    });
//    requestAnimationFrame(loop);
//  });
//}

// Pseudo Code for Snake Turning
// detect directional button press (already implemented)
// Move snakeHead direction button has been pressed (hard 90 degree turn)
// note coordinates that the direction button was called at
// iterate over remaining array to change direction of each body segment as they encounter the turn coordinates
// all body segments follow in line from there.

// New Block Down Function



// Block Down Function
//function blockDown() {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    var lowerStopPoint = canvas.height - snakeHead.h;
//
//    snake.forEach(function(block) {
//      if(block.y !== lowerStopPoint) {
//        block.changeDirectionDown().draw().moveDown(block.x, block.y).draw();
//      } else {
//        block.y = lowerStopPoint;
//        block.draw();
//      }
//    });
//  requestAnimationFrame(loop);
//  });
//};

// Block Right Function
//function blockRight() {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//    snake.forEach(function(block) {
//      var rightStopPoint = canvas.width - block.w;  // Far Right Block is the tail
//
//      if(block.x !== rightStopPoint) {
//        block.draw().moveRight();
//      } else {
//        block.draw();
//      }
//    });
//  requestAnimationFrame(loop);
//  });
//}

// Block Left Function
//function blockLeft() {
//  requestAnimationFrame(function loop() {
//    context.clearRect(0, 0, canvas.width, canvas.height);
//
//    snake.forEach(function(block) {
//      var leftStopPoint = block.w - block.w;
//
//      if(snakeHead.x !== leftStopPoint) {
//        block.draw().moveLeft();
//      } else {
//        block.draw();
//      }
//    });
//  requestAnimationFrame(loop);
//  });
//}





//blockUp();
//blockDown();
//blockRight();
//blockLeft();
//changeDirection();


// Click Positioning Function
//function getClickPosition(e) {
//  function getPosition(element) {
//    var xPosition = 0;
//    var yPosition = 0;
//
//    while (element) {
//      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
//      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
//      element = element.offsetParent;
//    }
//
//    return { x: xPosition, y: yPosition };
//  }
//
//  var parentPosition = getPosition(e.currentTarget);
//  var xPosition = e.clientX - parentPosition.x;
//  var yPosition = e.clientY - parentPosition.y;
//
//  return { x: xPosition, y: yPosition };
//}


// What I know
  // Identifying the boundries of the canvas and how to control directional movement

// What I need to do
  // Logistics
    // Set up Git hub repo
    // outline waffle tasks
    //

  // Coding
    // Respond to keyboard input from keys 37-40 (arrow keys) - done.  Able to control overall array direction from arrow keys.

    // Work on snake Array (I can currently keep the snake as an array when going left to right (up until it hits the wall) but need to figure out how to make it change directions and have the array body follow it)

    // Set up board as a grid and work on how to define cells in the grid and how they relate to the snake and the food

  // Testing
    // Have not tested as there is no code to test presently





