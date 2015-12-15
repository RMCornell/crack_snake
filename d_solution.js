/**
 * Created by alchemy on 12/13/15.
 */


function Snake(board) {
  this.board = board;
  this.body = [new Block(board, 40, 40)];
  this.head = this.body[0];
  this.board.blocks.push(this.head);
  this.velocity = 2;
  return this;
}

Snake.prototype.move = function(direction) {
  if(direction === "38") {
    if(this.canMoveDown()) {
      this.moveOnYAxis(this.velocity * -1);
    }
  }
  else if(direction === "40") {
    if(this.canMoveUp()) {
      this.moveonYAxis(this.velocity);
    }
  }
  else if(direction === "37") {
    if(this.canMoveLeft()) {
      this.moveOnXAxis(this.velocity * -1);
    }
  }
  else if(direction === "39") {
    if(this.canMoveRight()) {
      this.moveOnXAxis(this.velocity);
    }
  }
};

Snake.prototype.canMoveUp = function() {
  return !(this.isAtTop() || this.blockBelow());
};

Snake.prototype.isAtTop = function() {
  return this.head.y + 11 > this.board.rows;
};

Snake.prototype.blockBelow = function() {
  return !!this.board.findBlock(this.head.x, this.head.y + 2)
};

