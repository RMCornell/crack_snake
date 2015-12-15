// Define where we will draw
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// Let's start with moving a block... then move to moving many of them.

// Define A Block
function Block(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  return this;
}

// Draw that block on the screen
Block.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.w, this.h);
  return this
};

// Move the Block to the Right
Block.prototype.moveRight = function() {
  this.x++;
  return this
};



// Define the function that will draw the block on the screen
function drawBlock() {
  block = new Block(50, 50, 10, 10);
  block.draw().moveRight();
}

// Execute the function and draw the block
window.requestAnimationFrame(function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBlock();
  window.requestAnimationFrame(loop);
});


