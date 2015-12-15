/**
 * Created by alchemy on 12/15/15.
 */

// Define Global Variables
var cellWidth = 10;
var snakeStartLength = 1;
var left = 37;
var up = 38;
var right = 39;
var down = 40;
var fpsLimit = 1000/20;

// Start Game
window.onload = function() {
  new Game(document.getElementById('game'));
};

// Request Animation Frame
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

// Constructor
function Game(canvas) {
  this.canvas = canvas || null;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
  this.context = null;
  this.snake = null;
  this.food = { x: 0, y: 0 };

  this.now    =   ((new Date()).getTime())-1;
  this.last   =   null;

  this.ready();
  this.init();
}

Game.prototype.ready = function() {
  if(this.canvas === null || this.canvas.getContext === undefined) {  return; }

  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  this.context = canvas.getContext('2d');

  this.snake = new Snake(this);

  this.createFood();
};

Game.prototype.init = function() {
  var _this = this;
  window.requestAnimationFrame(function() {
    _this.gameLoop();
  })
};

Game.prototype.createFood = function() {
  this.food.x = ~~(Math.random() * (this.canvasWidth - cellWidth)/cellWidth);
  this.food.y = ~~(Math.random() * (this.canvasHeight - cellWidth)/cellWidth);
};

Game.prototype.gameLoop = function() {
  var _this = this;
  window.requestAnimationFrame(function() {
    _this.gameLoop();
  });

  var now     =   (new Date()).getTime(),
    delta   =   (now-this.last);


  if(delta > fpsLimit) {
    this.logic();
    this.drawGame();
    this.last = now - (delta%fpsLimit);
  }

};

Game.prototype.logic = function() {
  this.snake.logic();
};

Game.prototype.draw = function(x, y) {
  this.context.fillRect((x * cellWidth), (y * cellWidth), cellWidth, cellHeight)
};

Game.prototype.drawGame = function() {
  this.snake.draw();
  this.draw(this.food.x, this.food.y);
};

// Snake
function Snake(game) {
  this.game = game;
  this.snake = {x: 0, y: 0, data: [], direction: 'right' }
  this.score = 0;
  this.init();
}

Snake.prototype.init = function() {
  var i = snakeStartLength - 1;

  for(; i >-0; i--){
    this.snake.data.push({x: i, y: 0});
  }
};

Snake.prototype.restart = function() {
  this.snake = {x: 0, y: 0, data: [], direction: 'right' };
  this.score = 0;
  this.createSnake();
};

Snake.prototype.controls = function() {
  var _this = this;

  window.addEventListener("keydown", function(e) {
    _this.checkControls(e);
  }, false);
};

Snake.prototype.checkControls = function(e) {
  e.preventDefault();
  var key = e.keyCode;

  if(key === up && this.snake.dir !== 'down'){
    this.snake.dir = 'up';
  } else if(key === right && this.snake.dir !== 'left'){
    this.snake.dir = 'right';
  } else if(key === down && this.snake.dir !== 'up'){
    this.snake.dir = 'down';
  } else if(key === 'left' && this.snake.dir !== 'right'){
    this.snake.dir = 'left';
  }
};

Snake.prototype.collisionCheck = function(x,y) {
  var i = 0;
  for(; i < this.snake.data.length; i++) {
    if(this.snake.data[i].x == x && this.snake.data[i].y == y) {
      return true
    }
  }
  return false;
};

Snake.prototype.logic = function() {
  var snakeHead = {x: this.snake.data[0].x, y: this.snake.data[0].y};

  switch (this.snake.dir) {
    case 'up':
      head.y--;
      break;
    case 'right':
      head.x++;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
  }

  var tail = {};

  if (head.x == this.game.food.x && head.y == this.game.food.y) {
    tail = {x: this.game.food.x, y: this.game.food.y};
    this.game.createFood();
    this.score++;
  } else {
    this.snake.data.pop();
    tail = head;
  }

  if (head.x > (this.game.canvasWidth / cellWidth) - 1 || head.x < 0 || head.y > (this.game.canvasHeight / cellWidth) - 1 || head.y < 0 || this.collisionCheck(head.x, head.y)) {
    this.restart();
  }

  this.snake.data.unshift(tail);
  console.log(this.snake.data);
};

Snake.prototype.draw = function() {
  var i = 0;
  for (; i<this.snake.data.length; i++) {
    this.game.drawCell(
      this.snake.data[i].x,
      this.snake.data[i].y
    );
  }
};










