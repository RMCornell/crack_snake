/**
 * Created by alchemy on 12/15/15.
 */

//
// main.js
//
// SnakeGame tutorial class by html5gamedev.de
//

// define global variables
var	SG_CELL_WIDTH			=	10,
  SG_SNAKE_START_LENGTH	=	5,
  SG_CONTROLS_UP			=	38,
  SG_CONTROLS_RIGHT		=	39,
  SG_CONTROLS_DOWN		=	40,
  SG_CONTROLS_LEFT		=	37,
  SG_FPS_LIMIT			=	1000/20;

window.onload = function() {
  "use strict";

  // start game
  var game = new snakeGame(document.getElementById('canvas'));
};

//
// snakeGame.js
//
// SnakeGame tutorial class by html5gamedev.de
//

// requestAnimationFrame polyfrom by Erik Moeller
var lastTime = 0;
var vendors = ['webkit', 'moz'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  window.cancelAnimationFrame =
    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

if (!window.cancelAnimationFrame)
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };


// constructor
function snakeGame(canvas) {
  // assign base values
  this.canvas =	canvas || null;		// canvas element
  this.cw		=	0;					// canvas width
  this.ch		=	0;					// canvas height
  this.ctx 	=	null;				// canvas 2d rendering context
  this.snake 	= 	null;				// snake data
  this.food 	=	{x:0,y:0};			// food data

  this.now 	=	((new Date()).getTime())-1;	// set current time
  this.last	=	null;						// last rendering time

  // start prepare function
  this.prepare();
  this.init();
}

// prepare function
// get context and canvas data, create food
// coordinates and create snake player
snakeGame.prototype.prepare	=	function() {
  // if there is no canvas or no canvas support, stop here
  if(this.canvas === null || this.canvas.getContext === undefined) {	return;	}

  // assign width and height of canvas
  this.cw 	=	this.canvas.width;
  this.ch 	=	this.canvas.height;

  // assign context
  this.ctx 	=	this.canvas.getContext('2d');

  // add player and assign game class to it, so we are able to call functions and read variables
  // of the game class inside the snake class
  this.snake 	=	new snake(this);

  // add food
  this.createFood();
};

// init function
// bind keys and start game loop
snakeGame.prototype.init	=	function() {
  var _this	=	this;
  window.requestAnimationFrame(function() { _this.gameLoop(); });
};

// create food function
// creates new food with random coordinates
snakeGame.prototype.createFood	=	function() {
  // assign random generated x coordinate and as non-floating number using double negative bit-operator ~~
  this.food.x	=	~~(Math.random()*(this.cw-SG_CELL_WIDTH)/SG_CELL_WIDTH);
  // assign random generated y coordinate and as non-floating number using double negative bit-operator ~~
  this.food.y =	~~(Math.random()*(this.ch-SG_CELL_WIDTH)/SG_CELL_WIDTH);
};

// gameloop
snakeGame.prototype.gameLoop	=	function(delta) {
  // call gameloop as soon as possible again
  var _this = this;
  window.requestAnimationFrame(function() { _this.gameLoop(); } );

  // assign current time
  var now 	= 	(new Date()).getTime(),		// assign current time
    delta	=	(now-this.last);			// calculate the difference between last and current tick

  // only render if delta is above the fps limit
  if(delta > SG_FPS_LIMIT) {
    // handle game logic
    this.gameLogic();
    // draw game
    this.drawGame();
    // assign last time
    this.last = now - (delta%SG_FPS_LIMIT);
  }
};

// game logic function
// handles every game mechanic of the game
snakeGame.prototype.gameLogic	=	function() {
  // nothing special here, we are
  // calculating the game logic of the snake itself
  // and handle it inside the snake class
  this.snake.gameLogic();
};

// drawing function
// this functions draws cells, as every part
// of this game is displayed in cells
snakeGame.prototype.drawCell	=	function(x,y,_color) {
  if(typeof(x) == undefined || typeof(y) == undefined) {	return; }		// if no x or y is assigned, stop here

  // assign cell color or display blue as default color
  var color 	=	_color || 'blue';

  // assign cell rendering color
  this.ctx.fillStyle	=	color;
  // render cell
  this.ctx.fillRect(
    (x*SG_CELL_WIDTH),				// x starting point
    (y*SG_CELL_WIDTH),				// y starting point
    SG_CELL_WIDTH,					// rendering width
    SG_CELL_WIDTH					// rendering height
  );
  // assign stroke (border) color
  this.ctx.strokeStyle=	'white';
  // render border
  this.ctx.strokeRect(
    (x*SG_CELL_WIDTH),				// x starting point
    (y*SG_CELL_WIDTH),				// y starting point
    SG_CELL_WIDTH,					// rendering width
    SG_CELL_WIDTH					// rendering height
  );
};

// main drawing function
// handles the whole rendering process
snakeGame.prototype.drawGame	=	function() {
  // draw black background
  this.ctx.fillStyle	=	'black';
  this.ctx.fillRect(0,0,this.cw,this.ch);

  // render snake
  // no direct rendering here, rendering
  // is handled by the snake class
  this.snake.render();

  // render food
  this.drawCell(this.food.x,this.food.y);

  // draw score
  this.ctx.fillStyle	=	'white';
  this.ctx.fillText('Score: '+this.snake.score,10,20);
};


//
// snake.js
//
// SnakeGame tutorial class by html5gamedev.de
//

function snake(game) {
  if(game === null || !(game instanceof snakeGame)) {	return false;	} // stop here if game is not set or not an instance of the snakeGame class

  // default values
  this.game 	=	game;
  this.snake 	=	{x:0,y:0,data:[],dir:'r'};
  this.score	=	0;

  this.init();
}

// init functions
// creates a snake and binds controls
snake.prototype.init = function() {
  this.createSnake();
  this.bindControls();
};

// create function
// resets data array and creates a
// fresh snake
snake.prototype.createSnake = function() {
  var i = SG_SNAKE_START_LENGTH-1;

  for(;i>=0;i--) {
    this.snake.data.push({x:i,y:0});
  }
};

// resets snake
snake.prototype.restartSnake = function() {
  this.snake 	=	{x:0,y:0,data:[],dir:'r'};
  this.score 	=	0;
  this.createSnake();
};

// controls binding
// assigns function to keypress event
snake.prototype.bindControls = function() {
  var _this	=	this;

  if (window.addEventListener) {
    window.addEventListener("keydown", function(e) { _this.checkControls(e); }, false);
  } else {
    window.attachEvent('keydown', function(e) { _this.checkControls(e); });
  }
};

// checks keypress
// assigns fitting keys to respective control
snake.prototype.checkControls = function(e) {
  e.preventDefault();
  var key = e.which;

  if(key === SG_CONTROLS_UP && this.snake.dir !== 'd') {
    this.snake.dir = 'u';
  } else if(key === SG_CONTROLS_RIGHT && this.snake.dir !== 'l') {
    this.snake.dir = 'r';
  } else if(key === SG_CONTROLS_DOWN && this.snake.dir !== 'u') {
    this.snake.dir = 'd';
  } else if(key === SG_CONTROLS_LEFT && this.snake.dir !== 'r') {
    this.snake.dir = 'l';
  }
};

// collision checking
// checks for collision with itself
snake.prototype.checkCollision = function(x,y) {
  var i = 0;
  // loop through snake data
  for(;i<this.snake.data.length;i++) {
    // check if the current snake data block has same
    // x and y coordinate. in this case, we got a collision
    // and return true
    if(this.snake.data[i].x == x && this.snake.data[i].y == y) {
      return true;
    }
  }

  // no collision found, return false
  return false;
};


snake.prototype.gameLogic = function() {
  // get the head of the snake
  // as this will be used for collision checking
  var head 	=	{x:this.snake.data[0].x,y:this.snake.data[0].y};

  // check movement
  switch(this.snake.dir) {
    case 'u':	head.y--;		// go up
      break;
    case 'r':	head.x++;		// go right
      break
    case 'd':	head.y++;		// go down
      break;
    case 'l':	head.x--;		// go left
      break;
  }

  var tail = {};

  // check for food collision
  if(head.x == this.game.food.x && head.y == this.game.food.y) {
    // add foods position as new part of the snake
    tail = {x:this.game.food.x,y:this.game.food.y};
    // create new food
    this.game.createFood();
    // add one to score
    this.score++;
  } else {
    // no collision with food happend
    // add head as tail again
    this.snake.data.pop();	//	removes the last part of the snake array
    tail = head;
  }

  // check if head position is outside the canvas or if there is a collision
  if(head.x > (this.game.cw/SG_CELL_WIDTH)-1 || head.x < 0 || head.y > (this.game.ch/SG_CELL_WIDTH)-1 || head.y < 0 || this.checkCollision(head.x,head.y)) {
    // restart the snake
    this.restartSnake();
    return;
  }

  // add head OR new snake part to the beginning
  // of the snake data
  this.snake.data.unshift(tail);
  console.log(this.snake.data);

};
// rendering function
// renders the snake on the screen
snake.prototype.render = function() {
  var i = 0;
  // loop snake array and draw it using snakeGame.drawCell() function
  for(;i<this.snake.data.length;i++) {
    this.game.drawCell(
      this.snake.data[i].x,
      this.snake.data[i].y,
      'red'
    );
  }
};
